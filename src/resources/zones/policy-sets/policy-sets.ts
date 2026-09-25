// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as VersionsAPI from './versions';
import {
  PolicySetVersion,
  VersionArchiveParams,
  VersionCreateParams,
  VersionListParams,
  VersionListPoliciesParams,
  VersionListPoliciesResponse,
  VersionListResponse,
  VersionRetrieveParams,
  VersionUpdateParams,
  Versions,
} from './versions';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Policy set CRUD and binding management
 */
export class PolicySets extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Creates a policy set. Supply `manifest` to create its first version and any new
   * policies in the same transaction. A failure rolls back every write. Without
   * `manifest`, creates a versionless set and preserves the existing response body.
   *
   * Entries use manifest apply semantics with no predecessor: bare pins use each
   * policy's latest version; supplied content reuses that version when its SHA and
   * schema match. Omitted `schema_version` uses the zone default. This operation
   * supports neither `dry_run` nor `If-Match`. Set `manifest.activate: true` to bind
   * v1 to the zone's active slot in the same transaction. Requires
   * `target_type: zone` (the default) and the `activate` permission on
   * `policy_set_bindings`, in addition to the route's `create` permission. Omitted
   * or false leaves the set unbound.
   *
   * The `ETag` header is the set revision, as on `GET`. The manifest digest is
   * `policy_set_version.manifest_sha` and the `ETag` of `GET .../manifest`.
   *
   * Domain error codes: `policy_set_name_conflict`, `policy_name_conflict`,
   * `policy_not_found`, `policy_archived`, `policy_version_not_found`,
   * `version_archived`, `schema_version_mismatch`, `manifest_duplicate_policy`,
   * `missing_cedar_content`, `invalid_cedar`, `schema_version_unsupported`,
   * `activate_requires_zone_target`.
   */
  create(
    zoneID: string,
    params: PolicySetCreateParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetWithBinding> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/zones/${zoneID}/policy-sets`, {
      body,
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
   * Returns the policy set with current binding information.
   */
  retrieve(
    policySetID: string,
    params: PolicySetRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetWithBinding> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policy-sets/${policySetID}`, {
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
   * Update policy set metadata (name). Binding is managed by activating a policy set
   * version or via the policy-bindings API.
   */
  update(
    policySetID: string,
    params: PolicySetUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetWithBinding> {
    const {
      zone_id,
      'If-Match': ifMatch,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.patch(path`/zones/${zone_id}/policy-sets/${policySetID}`, {
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

  /**
   * Returns a paginated list of policy sets in the zone.
   *
   * `filter[target_type]` defaults to `zone`, hiding principal-scoped sets (e.g.
   * per-user bundle sets) unless explicitly widened. The deprecated
   * `filter[scope_type]` is honored as an equivalent and suppresses the default;
   * supplying both with different value sets returns 400.
   */
  list(
    zoneID: string,
    params: PolicySetListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PolicySetListResponse> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/zones/${zoneID}/policy-sets`, {
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
   * Archive a policy set
   */
  archive(
    policySetID: string,
    params: PolicySetArchiveParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetWithBinding> {
    const {
      zone_id,
      'If-Match': ifMatch,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
    } = params;
    return this._client.delete(path`/zones/${zone_id}/policy-sets/${policySetID}`, {
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
 * JWS Flattened JSON Serialization (RFC 7515 §7.2.2) of a policy set attestation.
 * The protected header carries the signing algorithm and key identifier; the
 * payload is a base64url-encoded AttestationStatement canonicalized per RFC 8785
 * (JCS). Verify using the zone JWKS endpoint (RFC 7517). Currently signed with
 * RS256; future zone key types (e.g. EdDSA) will be indicated by the "alg" header
 * — no envelope changes required.
 */
export interface Attestation {
  /**
   * Base64url-encoded AttestationStatement (RFC 7515 §3). Decode to inspect
   * attestation content. The RFC 8785 canonical form of the decoded JSON is the JWS
   * Signing Input alongside the protected header.
   */
  payload: string;

  /**
   * Base64url-encoded JWS protected header (RFC 7515 §4). Contains at minimum "alg"
   * (signing algorithm — currently RS256, will migrate to EdDSA) and "kid" (signing
   * key identifier resolvable via the zone JWKS endpoint).
   */
  protected: string;

  /**
   * Base64url-encoded digital signature computed over the JWS Signing Input
   * (ASCII(protected) || '.' || payload) per RFC 7515 §5.1.
   */
  signature: string;
}

/**
 * Decoded content of an Attestation JWS payload. Describes the exact policy set
 * version composition at attestation time. This schema defines what consumers see
 * after base64url-decoding the Attestation.payload field.
 */
export interface AttestationStatement {
  attested_at: string;

  attested_by: string;

  /**
   * Key ID of the signing key used to produce the attestation signature. Matches the
   * "kid" in the JWS protected header.
   */
  key_id: string;

  /**
   * SHA-256 of the policy set version manifest. Verifiers MUST check this matches
   * the policy_set_version.manifest_sha to detect attestation/version mismatches.
   */
  manifest_sha: string;

  policy_set_id: string;

  policy_set_version: number;

  /**
   * Event that produced this attestation. "created" is the initial attestation at
   * version creation; "re_signed" is a re-attestation after key rotation (same
   * content, new signature).
   */
  status: 'created' | 're_signed';

  /**
   * Statement type discriminator
   */
  type: 'policy_set_attestation';

  /**
   * Statement schema version
   */
  v: 1;

  zone_id: string;
}

export interface PolicySet {
  id: string;

  created_at: string;

  created_by: string;

  name: string;

  /**
   * Who manages this policy set:
   *
   * - `"platform"` — managed by the Keycard platform (system policies).
   * - `"customer"` — managed by the tenant (custom policies).
   */
  owner_type: 'platform' | 'customer';

  /**
   * @deprecated **Deprecated.** Use `target_type` instead. Carries the same value.
   */
  scope_type: 'zone' | 'resource' | 'user' | 'session';

  /**
   * What this policy set targets:
   *
   * - `"zone"` — applies to all requests in the zone.
   * - `"user"` — scoped to a specific user.
   *
   * `resource` and `session` are reserved; legacy sets with those scopes carry them
   * in the deprecated `scope_type` field.
   */
  target_type: 'zone' | 'user';

  updated_at: string;

  zone_id: string;

  archived_at?: string | null;

  /**
   * The organization user behind a `created_by`, `updated_by` or `archived_by`
   * value. Returned only when `expand[]=user` is requested.
   */
  created_by_user?: PolicySet.CreatedByUser;

  /**
   * Human-readable version number of the latest version (e.g., 1, 2, 3)
   */
  latest_version?: number | null;

  latest_version_id?: string | null;

  updated_by?: string | null;

  /**
   * The organization user behind a `created_by`, `updated_by` or `archived_by`
   * value. Returned only when `expand[]=user` is requested.
   */
  updated_by_user?: PolicySet.UpdatedByUser;
}

export namespace PolicySet {
  /**
   * The organization user behind a `created_by`, `updated_by` or `archived_by`
   * value. Returned only when `expand[]=user` is requested.
   */
  export interface CreatedByUser {
    /**
     * Public ID of the user in the organization's platform zone. This is not the same
     * value as the `*_by` field it expands; use it to link to
     * `/zones/{zone_id}/users/{id}`.
     */
    id: string;

    /**
     * The user's email address, or null when not known.
     */
    email: string | null;

    /**
     * Public ID of the organization's platform zone the user belongs to.
     */
    zone_id: string;
  }

  /**
   * The organization user behind a `created_by`, `updated_by` or `archived_by`
   * value. Returned only when `expand[]=user` is requested.
   */
  export interface UpdatedByUser {
    /**
     * Public ID of the user in the organization's platform zone. This is not the same
     * value as the `*_by` field it expands; use it to link to
     * `/zones/{zone_id}/users/{id}`.
     */
    id: string;

    /**
     * The user's email address, or null when not known.
     */
    email: string | null;

    /**
     * Public ID of the organization's platform zone the user belongs to.
     */
    zone_id: string;
  }
}

export interface PolicySetDraft {
  created_at: string;

  manifest: PolicySetManifest;

  policy_set_id: string;

  schema_version: string;

  updated_at: string;

  updated_by: string;

  /**
   * ID of the policy set version this draft was hydrated from. Null when the draft
   * was created without an existing version.
   */
  base_version_id?: string | null;

  description?: string | null;

  name?: string | null;

  /**
   * The organization user behind a `created_by`, `updated_by` or `archived_by`
   * value. Returned only when `expand[]=user` is requested.
   */
  updated_by_user?: PolicySetDraft.UpdatedByUser;

  /**
   * Warnings about manifest entries that would prevent creating a version from this
   * draft. Present only when there are warnings; omitted when empty.
   */
  warnings?: Array<PolicySetDraft.Warning>;
}

export namespace PolicySetDraft {
  /**
   * The organization user behind a `created_by`, `updated_by` or `archived_by`
   * value. Returned only when `expand[]=user` is requested.
   */
  export interface UpdatedByUser {
    /**
     * Public ID of the user in the organization's platform zone. This is not the same
     * value as the `*_by` field it expands; use it to link to
     * `/zones/{zone_id}/users/{id}`.
     */
    id: string;

    /**
     * The user's email address, or null when not known.
     */
    email: string | null;

    /**
     * Public ID of the organization's platform zone the user belongs to.
     */
    zone_id: string;
  }

  export interface Warning {
    /**
     * Human-readable description of the warning, e.g. 'validated against schema
     * "2026-02-24", draft targets "2026-03-16"' or 'policy version is archived'.
     */
    message: string;

    policy_id: string;

    policy_version_id: string;

    type: 'policy_version_archived' | 'schema_version_mismatch';

    /**
     * Additional structured context for a manifest warning. The shape depends on the
     * warning type.
     */
    detail?: Warning.Detail;
  }

  export namespace Warning {
    /**
     * Additional structured context for a manifest warning. The shape depends on the
     * warning type.
     */
    export interface Detail {
      /**
       * Schema version the draft targets. Present only for schema_version_mismatch
       * warnings.
       */
      draft_schema_version?: string;

      /**
       * Schema version the policy version was validated against. Present only for
       * schema_version_mismatch warnings.
       */
      policy_schema_version?: string;
    }
  }
}

export interface PolicySetManifest {
  entries: Array<PolicySetManifestEntry>;
}

export interface PolicySetManifestEntry {
  policy_id: string;

  policy_version_id: string;

  /**
   * SHA-256 of the policy version content, populated by the server
   */
  sha?: string;
}

export interface PolicySetWithBinding extends PolicySet {
  /**
   * Whether this policy set is currently bound to a scope
   */
  active?: boolean;

  /**
   * Human-readable version number of the active version (e.g., 1, 2, 3)
   */
  active_version?: number | null;

  /**
   * Public ID of the currently active (bound) version
   */
  active_version_id?: string | null;

  /**
   * Active zone binding, present when created with `manifest.activate` set to true.
   */
  binding?: PolicySetWithBinding.Binding;

  /**
   * Per-policy outcomes, present only when created with a manifest.
   */
  changes?: Array<PolicySetWithBinding.Change>;

  mode?: 'active' | 'shadow' | null;

  /**
   * First version, present only when created with a manifest.
   */
  policy_set_version?: VersionsAPI.PolicySetVersion;

  /**
   * @deprecated **Deprecated.** Use `target_id` instead. Carries the active
   * binding's target; null when unbound.
   */
  scope_target_id?: string | null;

  /**
   * Human-readable version number of the shadow version
   */
  shadow_version?: number | null;

  /**
   * Public ID of the shadow (observed) version, if any
   */
  shadow_version_id?: string | null;

  /**
   * Target entity ID. Equals `zone_id` for zone-targeted sets; the principal
   * identifier for principal-scoped sets. Null only for legacy non-zone sets that
   * predate target tracking.
   */
  target_id?: string | null;

  /**
   * Non-fatal findings, present only when non-empty on create.
   */
  warnings?: Array<PolicySetWithBinding.Warning>;
}

export namespace PolicySetWithBinding {
  /**
   * Active zone binding, present when created with `manifest.activate` set to true.
   */
  export interface Binding {
    /**
     * Binding identifier (stable per slot)
     */
    id: string;

    created_at: string;

    /**
     * Binding mode
     */
    mode: 'active' | 'shadow';

    /**
     * Public ID of the bound policy set
     */
    policy_set_id: string;

    /**
     * Public ID of the bound policy set version
     */
    policy_set_version_id: string;

    /**
     * @deprecated **Deprecated.** Use `target_id` instead. Carries the same value.
     */
    scope_target_id: string;

    /**
     * @deprecated **Deprecated.** Use `target_type` instead. Carries the same value.
     */
    scope_type: 'zone';

    /**
     * Target entity ID. Equals zone_id for zone-targeted bindings.
     */
    target_id: string;

    /**
     * What this binding targets
     */
    target_type: 'zone' | 'user';
  }

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

export interface PolicySetListResponse {
  items: Array<PolicySetWithBinding>;

  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  pagination: PolicySetListResponse.Pagination;
}

export namespace PolicySetListResponse {
  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  export interface Pagination {
    /**
     * An opaque cursor used for paginating through a list of results
     */
    after_cursor: string | null;

    /**
     * An opaque cursor used for paginating through a list of results
     */
    before_cursor: string | null;

    /**
     * Total number of items across all pages. Only present when the request includes
     * ?expand[]=total_count.
     */
    total_count?: number;
  }
}

export interface PolicySetCreateParams {
  /**
   * Body param
   */
  name: string;

  /**
   * Body param: Content for the first version, created atomically with the set.
   */
  manifest?: PolicySetCreateParams.Manifest;

  /**
   * @deprecated Body param: **Deprecated.** Use `target_type` instead. Only `zone`
   * is accepted; use `target_type` for `user` targets.
   */
  scope_type?: 'zone';

  /**
   * Body param: What this policy set targets:
   *
   * - `"zone"` — applies to all requests in the zone.
   * - `"user"` — can be bound to a specific user.
   */
  target_type?: 'zone' | 'user';

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

export namespace PolicySetCreateParams {
  /**
   * Content for the first version, created atomically with the set.
   */
  export interface Manifest {
    /**
     * Initial manifest entries, in request order.
     */
    entries: Array<Manifest.PdpExistingPolicyEntry | Manifest.PdpNewPolicyEntry>;

    /**
     * Bind the first version to the zone's active slot in the same transaction.
     * Requires a zone-targeted set and the activate permission on policy_set_bindings.
     */
    activate?: boolean;

    /**
     * Schema to validate and pin v1 against. Defaults to the zone default.
     */
    schema_version?: string;
  }

  export namespace Manifest {
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
}

export interface PolicySetRetrieveParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Query param: Opt-in to additional response fields on a single resource (`user`).
   * Repeatable.
   */
  expand?: Array<'user'>;

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

export interface PolicySetUpdateParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Body param
   */
  name?: string;

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

export interface PolicySetListParams {
  /**
   * Query param: **Deprecated.** Use `filter[active]` instead.
   *
   * Filter by active binding status. When `true`, returns only policy sets with an
   * active binding. When `false`, returns only policy sets without one. Omit to
   * return all.
   *
   * Still honored for backward compatibility. Supplying both `active` and
   * `filter[active]` with conflicting values returns `400 Bad Request`.
   */
  active?: boolean;

  /**
   * Query param: Cursor for forward pagination. Returned in
   * `Pagination.after_cursor`. Mutually exclusive with `before`.
   */
  after?: string;

  /**
   * Query param: Cursor for backward pagination. Returned in
   * `Pagination.before_cursor`. Mutually exclusive with `after`.
   */
  before?: string;

  /**
   * Query param: **Deprecated.** Use `expand[]` instead.
   *
   * Opt-in to additional response fields. Still honored for backward compatibility;
   * supplying both `expand` and `expand[]` with disagreeing values returns
   * `400 Bad Request`.
   */
  expand?: Array<'total_count' | 'user'>;

  /**
   * Query param: Filter by active binding status. When `true`, returns only policy
   * sets with an active binding. When `false`, returns only policy sets without one.
   * Omit to return all.
   */
  'filter[active]'?: boolean;

  /**
   * Query param: Filter on `owner_type`. Repeatable; repeated instances OR across
   * values (e.g. `?filter[owner_type]=platform&filter[owner_type]=customer` matches
   * either). See `FilterValues` in the shared spec for the full wire convention.
   *
   * Allowed values: `platform`, `customer`. Unknown values return 400 with the list
   * of allowed values. Comma-separated single values (e.g.
   * `?filter[owner_type]=platform,customer`) are rejected with a 400 pointing at the
   * repeated-parameter OR form.
   *
   * Note: the allowed-value enum is enforced in the handler (not as an OpenAPI
   * `items.enum`) so the server can return a targeted error for the comma-AND form
   * instead of a generic "not in allowed values" response.
   */
  'filter[owner_type]'?: Array<string>;

  /**
   * Query param: **Deprecated.** Use `filter[target_type]` instead.
   *
   * Filter on `scope_type` (policy sets only). Repeatable; repeated instances OR
   * across values. See `FilterValues` in the shared spec for the full wire
   * convention.
   *
   * Allowed values: `zone` only. Use `filter[target_type]` to select `user` (or
   * future) targets. Unknown values return 400 with the list of allowed values.
   * Comma-separated single values are rejected with a 400 pointing at the
   * repeated-parameter OR form.
   *
   * Still honored for backward compatibility and suppresses the
   * `filter[target_type]` zone default. Supplying both this and
   * `filter[target_type]` with different value sets returns `400 Bad Request`.
   */
  'filter[scope_type]'?: Array<string>;

  /**
   * Query param: Filter on `target_type`. Repeatable; repeated instances OR across
   * values. See `FilterValues` in the shared spec for the full wire convention.
   *
   * Allowed values: `zone`, `user` (`resource` and `session` are reserved and not
   * yet accepted). Unknown values return 400 with the list of allowed values.
   * Comma-separated single values are rejected with a 400 pointing at the
   * repeated-parameter OR form.
   *
   * **Defaults to `zone`** when omitted (and no deprecated equivalent parameter is
   * supplied), so listings exclude principal-scoped elements unless explicitly
   * widened. On `listPolicies` the default is skipped when `filter[id]` is present,
   * so by-ID fetches resolve regardless of target.
   *
   * Note: the allowed-value enum is enforced in the handler (not as an OpenAPI
   * `items.enum`) so the server can return a targeted error for the comma-AND form
   * instead of a generic "not in allowed values" response.
   */
  'filter[target_type]'?: Array<string>;

  /**
   * Query param: Maximum number of items to return per page.
   */
  limit?: number;

  /**
   * Query param: Sort direction. Default is desc (newest first).
   */
  order?: 'asc' | 'desc';

  /**
   * Query param: Case-insensitive substring search across all searchable fields of
   * the resource. For policies that is `name` and `description`; for policy sets
   * that is `name`. Repeatable; if multiple terms are supplied they are OR-ed.
   */
  query?: Array<string>;

  /**
   * Query param: Case-insensitive substring search on `name`. Repeatable; if
   * multiple terms are supplied they are OR-ed (any matching term returns the row).
   */
  'query[name]'?: Array<string>;

  /**
   * Query param: Field to sort by. `created_at` (default) sorts by creation date.
   * `status` sorts active-first, then by creation date within each group. When
   * `sort=status`, only descending order and forward pagination are supported;
   * `order=asc` or `before` cursors return 400.
   */
  sort?: 'created_at' | 'status';

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

export interface PolicySetArchiveParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

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

PolicySets.Versions = Versions;

export declare namespace PolicySets {
  export {
    type Attestation as Attestation,
    type AttestationStatement as AttestationStatement,
    type PolicySet as PolicySet,
    type PolicySetDraft as PolicySetDraft,
    type PolicySetManifest as PolicySetManifest,
    type PolicySetManifestEntry as PolicySetManifestEntry,
    type PolicySetWithBinding as PolicySetWithBinding,
    type PolicySetListResponse as PolicySetListResponse,
    type PolicySetCreateParams as PolicySetCreateParams,
    type PolicySetRetrieveParams as PolicySetRetrieveParams,
    type PolicySetUpdateParams as PolicySetUpdateParams,
    type PolicySetListParams as PolicySetListParams,
    type PolicySetArchiveParams as PolicySetArchiveParams,
  };

  export {
    Versions as Versions,
    type PolicySetVersion as PolicySetVersion,
    type VersionListResponse as VersionListResponse,
    type VersionListPoliciesResponse as VersionListPoliciesResponse,
    type VersionCreateParams as VersionCreateParams,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionUpdateParams as VersionUpdateParams,
    type VersionListParams as VersionListParams,
    type VersionArchiveParams as VersionArchiveParams,
    type VersionListPoliciesParams as VersionListPoliciesParams,
  };
}
