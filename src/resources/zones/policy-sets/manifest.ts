// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PolicyBindingsAPI from '../policy-bindings';
import * as PolicySetsAPI from './policy-sets';
import * as VersionsAPI from './versions';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Declarative read/apply of a policy set's full content
 */
export class Manifest extends APIResource {
  /**
   * Returns the resolved manifest of the **latest non-archived version** by default.
   * Pass `?version=` with a policy set version public ID to read a specific
   * version's manifest (e.g. for rollback: GET an old manifest, PUT it back — which
   * mints a new version at the tip with the old content; history is never
   * re-pointed).
   *
   * There is deliberately no `?version=active` keyword: a binding slot is
   * `(zone, target_type, target_id, mode)` and a set may have zero or several active
   * bindings, so "the active version" is not a function of the set alone. Resolve
   * the version ID first — from the enriched policy set representation
   * (`active_version_id`) or `GET /policy-bindings` — then pass it here.
   *
   * The default (latest) read anchors the apply flow: the `ETag` response header is
   * the JCS SHA-256 digest of the latest manifest and is the value to send as
   * `If-Match` on `PUT`. **`ETag` is emitted only on the default latest read** —
   * versioned reads return `manifest_sha` in the body but no `ETag`, so a stale
   * token cannot be round-tripped as a precondition.
   *
   * A policy set with no versions yet returns `200` with empty `entries`, null
   * `policy_set_version_id`/`version`/`schema_version`/`manifest_sha`, and the
   * digest of the empty manifest as `ETag`, so even the first apply can be
   * conditional.
   */
  retrieve(
    policySetID: string,
    params: ManifestRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ManifestRetrieveResponse> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policy-sets/${policySetID}/manifest`, {
      query,
      ...options,
      headers: buildHeaders([
        {
          ...(xAPIVersion != null ? { 'X-API-Version': xAPIVersion } : undefined),
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Declarative full-replace apply. `entries` is the complete desired content of the
   * policy set: **any policy omitted from `entries` is dropped from the resulting
   * version** (its rows are retained and a later apply may reference it again).
   * Entry order is preserved for newly added policies; retained policies keep their
   * current manifest order, so an unchanged apply is byte-identical and dedups to
   * the existing version.
   *
   * Per entry, the server diffs by content SHA against the version pinned in the
   * latest manifest: unchanged content under the same schema version reuses the
   * pinned policy version; changed content mints a new policy version; `new_policy`
   * entries mint a customer-owned policy with the requested name. All of this, plus
   * the policy set version mint and the optional activation, happens in **one
   * transaction** (row lock on the policy set). Cedar validation runs against the
   * resolved schema before the transaction opens — an invalid policy rejects the
   * whole apply with zero writes.
   *
   * **Schema resolution:** `schema_version` omitted → the latest version's schema if
   * still writable, else the zone default. Provided → authoritative
   * (`schema_version_unsupported` if unknown, unattested, or archived). All entries
   * validate against the single resolved version (uniform-schema-per-version is
   * retained); a pinned policy version created under a different schema is
   * re-versioned even if its content is unchanged.
   *
   * **Activation:** `activate: true` requires a zone-targeted set and rebinds the
   * `(zone, target_type=zone, mode=active)` slot to the resulting version in the
   * same transaction. It requires `policy_set_bindings:activate` permission and
   * preserves the previous binding in binding history. Unchanged content returns
   * `created: false` and still activates the resulting version. An already active
   * version keeps its binding unchanged.
   *
   * **Concurrency:** `If-Match` is optional (omitted = last-writer-wins). When
   * provided it is compared, under the row lock, against the digest of the latest
   * version's manifest; mismatch returns `412` (`etag_mismatch`) carrying the
   * current `ETag`. The token is content-addressed, not a version identity: it
   * guards "the content I read is still the content in place", so two versions with
   * identical manifests are interchangeable for the precondition, and archiving the
   * tip does not invalidate a token whose digest the new latest version still
   * carries. Do not re-key it on `policy_set_version_id`.
   *
   * **Identity and reverts:** a desired state identical to the **latest** version is
   * a no-op (`created: false`, latest returned, nothing minted). A desired state
   * matching an **older** version mints a new version at the tip — history is
   * linear, never forked. Rolling back deployment without a content edit is not an
   * apply at all: bind the older version via `PUT /policy-bindings`.
   *
   * **Authorization:** the route gate is `update` on the policy set. When
   * `activate: true`, the handler additionally requires the `activate` action on
   * `policy_set_bindings`.
   *
   * Domain error codes: `policy_set_not_found`, `policy_not_found`,
   * `policy_version_not_found`, `version_archived`, `schema_version_mismatch`,
   * `manifest_duplicate_policy`, `missing_cedar_content`, `invalid_cedar`,
   * `schema_version_unsupported`, `policy_name_conflict`, `policy_archived`,
   * `set_archived`, `etag_mismatch`, `activate_requires_zone_target`,
   * `shadow_equals_active`.
   */
  apply(
    policySetID: string,
    params: ManifestApplyParams,
    options?: RequestOptions,
  ): APIPromise<ManifestApplyResponse> {
    const {
      zone_id,
      dry_run,
      'If-Match': ifMatch,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.put(path`/zones/${zone_id}/policy-sets/${policySetID}/manifest`, {
      query: { dry_run },
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(ifMatch != null ? { 'If-Match': ifMatch } : undefined),
          ...(xAPIVersion != null ? { 'X-API-Version': xAPIVersion } : undefined),
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

/**
 * Readback shape of a policy set version's manifest, richer than the write shape:
 * each entry carries the resolved policy version ID and content SHA.
 */
export interface ManifestRetrieveResponse {
  entries: Array<PolicySetsAPI.PolicySetManifestEntry>;

  policy_set_id: string;

  /**
   * JCS SHA-256 digest of the stored manifest of the returned version. Null when no
   * versions exist yet. On the default latest read this is the same value the `ETag`
   * header carries.
   */
  manifest_sha?: string | null;

  /**
   * Null only for a policy set with no versions yet.
   */
  policy_set_version_id?: string | null;

  /**
   * Null when no versions exist yet.
   */
  schema_version?: string | null;

  /**
   * Monotonic version number. Null when no versions exist yet.
   */
  version?: number | null;
}

export interface ManifestApplyResponse {
  /**
   * Per-policy outcome of the diff.
   */
  changes: Array<ManifestApplyResponse.Change>;

  /**
   * True when the server mints a new policy set version. False when the content
   * matches the latest version, even when activate changes the active binding.
   * Reverts to older content mint a new version at the tip and return true.
   */
  created: boolean;

  /**
   * Present when activate was true.
   */
  binding?: PolicyBindingsAPI.PolicySetBinding;

  /**
   * The resulting version. Omitted on dry_run.
   */
  policy_set_version?: VersionsAPI.PolicySetVersion;

  /**
   * Non-fatal findings — e.g. Cedar actions unknown to the resolved schema. Present
   * only when non-empty.
   */
  warnings?: Array<ManifestApplyResponse.Warning>;
}

export namespace ManifestApplyResponse {
  export interface Change {
    /**
     * `repinned`: an explicit `policy_version_id` replaced a different version the set
     * already pinned for that policy; no version minted.
     */
    action: 'created_policy' | 'created_version' | 'reused' | 'repinned' | 'dropped';

    /**
     * The policy's name. Lets a caller correlate a `created_policy` row with its
     * `new_policy` request entry without a re-list.
     */
    name: string;

    policy_id: string;

    /**
     * Absent when action is dropped.
     */
    policy_version_id?: string;
  }

  export interface Warning {
    /**
     * Machine-readable warning code, e.g. unknown_actions.
     */
    code: string;

    message: string;
  }
}

export interface ManifestRetrieveParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Query param: Policy set version public ID. Default: latest non-archived version.
   */
  version?: string;

  /**
   * Header param: API version header (date-based, e.g. 2026-02-01)
   */
  'X-API-Version'?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface ManifestApplyParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Body param: Complete desired content. Order is preserved for newly added
   * policies; retained policies keep their current manifest order (so an unchanged
   * apply reproduces the identical manifest and dedups).
   */
  entries: Array<ManifestApplyParams.PdpExistingPolicyEntry | ManifestApplyParams.PdpNewPolicyEntry>;

  /**
   * Query param: Not yet implemented — `true` returns 501 until ACC-1002. When true,
   * performs validation, schema resolution, and the content diff, and returns the
   * would-be `changes` and `warnings` — but persists nothing. `policy_set_version`
   * is omitted from the response and no ETag is returned.
   */
  dry_run?: boolean;

  /**
   * Body param: Also rebind the zone/active slot to the resulting version in the
   * same transaction. Requires the `activate` permission on policy set bindings.
   * Targets only the zone/active slot; other slots go through PUT /policy-bindings.
   */
  activate?: boolean;

  /**
   * Body param: Cedar schema version to validate and pin the resulting version
   * against. Omitted: the server resolves it (latest version's schema if still
   * writable, else the zone default).
   */
  schema_version?: string;

  /**
   * Header param: ETag value from a previous GET/POST/PATCH response. When provided,
   * the update only succeeds if the resource has not been modified; otherwise 412
   * Precondition Failed is returned.
   */
  'If-Match'?: string;

  /**
   * Header param: API version header (date-based, e.g. 2026-02-01)
   */
  'X-API-Version'?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export namespace ManifestApplyParams {
  /**
   * Reference to an existing (non-archived) policy in the zone — not limited to
   * policies already in this set. With `cedar_raw`/`cedar_json` (mutually
   * exclusive): the server diffs by content SHA; unchanged content under the
   * resolved schema reuses the pinned policy version, changed content mints a new
   * one. Without content ("pin as-is"): reuses the version pinned in the latest
   * manifest, or the policy's latest version when the policy is newly added to this
   * set. Bare pins are re-versioned when the resolved schema differs from the pinned
   * version's schema. With `policy_version_id`: pins exactly that existing version
   * and mints nothing. Mutually exclusive with `cedar_raw`/`cedar_json` (a version
   * is content; 400 when both are supplied). The version must belong to `policy_id`,
   * must not be archived (`version_archived`), and must have been validated against
   * the resolved schema (`schema_version_mismatch`; no re-versioning). Reported as
   * `repinned` when the set already pins a different version of the policy,
   * otherwise `reused`. Platform-owned policies accept bare pins and
   * `policy_version_id` (customers cannot mint versions of those).
   */
  export interface PdpExistingPolicyEntry {
    /**
     * Public ID of an existing policy in the zone.
     */
    policy_id: string;

    /**
     * Cedar policy JSON. Mutually exclusive with cedar_raw.
     */
    cedar_json?: unknown;

    /**
     * Cedar policy text. Mutually exclusive with cedar_json.
     */
    cedar_raw?: string;

    /**
     * Public ID of an existing version of `policy_id` to pin. Mutually exclusive with
     * cedar_raw and cedar_json.
     */
    policy_version_id?: string;
  }

  /**
   * Mints a new customer-owned policy with the requested name (409
   * `policy_name_conflict` on collision) plus its first version from the supplied
   * content. Exactly one of `cedar_raw`/`cedar_json` is required.
   */
  export interface PdpNewPolicyEntry {
    new_policy: PdpNewPolicyEntry.NewPolicy;

    /**
     * Cedar policy JSON. Mutually exclusive with cedar_raw.
     */
    cedar_json?: unknown;

    /**
     * Cedar policy text. Mutually exclusive with cedar_json.
     */
    cedar_raw?: string;
  }

  export namespace PdpNewPolicyEntry {
    export interface NewPolicy {
      name: string;

      description?: string;
    }
  }
}

export declare namespace Manifest {
  export {
    type ManifestRetrieveResponse as ManifestRetrieveResponse,
    type ManifestApplyResponse as ManifestApplyResponse,
    type ManifestRetrieveParams as ManifestRetrieveParams,
    type ManifestApplyParams as ManifestApplyParams,
  };
}
