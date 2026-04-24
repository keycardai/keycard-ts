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
   * Creates an unbound policy set. Use updatePolicySet to bind after creating a
   * version.
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
    const { zone_id, 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.get(path`/zones/${zone_id}/policy-sets/${policySetID}`, {
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
   * Update metadata or manage binding. Set active=true to bind, active=false to
   * unbind.
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
   * List policy sets in a zone
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
   * The scope at which this policy set applies:
   *
   * - `"zone"` — applies to all requests in the zone.
   * - `"resource"` — scoped to a specific resource.
   * - `"user"` — scoped to a specific user.
   * - `"session"` — scoped to a specific session.
   */
  scope_type: 'zone' | 'resource' | 'user' | 'session';

  updated_at: string;

  zone_id: string;

  archived_at?: string | null;

  /**
   * Human-readable version number of the latest version (e.g., 1, 2, 3)
   */
  latest_version?: number | null;

  latest_version_id?: string | null;

  updated_by?: string | null;
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
   * Warnings about manifest entries that would prevent creating a version from this
   * draft. Present only when there are warnings; omitted when empty.
   */
  warnings?: Array<PolicySetDraft.Warning>;
}

export namespace PolicySetDraft {
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
     * Structured detail payload. Present for warning types that carry additional
     * context (e.g. schema_version_mismatch includes the two schema versions). Omitted
     * when the type alone is sufficient (e.g. policy_version_archived).
     */
    detail?: Warning.Detail;
  }

  export namespace Warning {
    /**
     * Structured detail payload. Present for warning types that carry additional
     * context (e.g. schema_version_mismatch includes the two schema versions). Omitted
     * when the type alone is sufficient (e.g. policy_version_archived).
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

  mode?: 'active' | 'shadow' | null;

  scope_target_id?: string | null;

  /**
   * Human-readable version number of the shadow version
   */
  shadow_version?: number | null;

  /**
   * Public ID of the shadow (observed) version, if any
   */
  shadow_version_id?: string | null;
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
   * Body param: The scope at which this policy set applies:
   *
   * - `"zone"` — applies to all requests in the zone.
   * - `"resource"` — scoped to a specific resource.
   * - `"user"` — scoped to a specific user.
   * - `"session"` — scoped to a specific session.
   */
  scope_type?: 'zone' | 'resource' | 'user' | 'session';

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

export interface PolicySetRetrieveParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

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
  expand?: Array<'total_count'>;

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
   * Query param: Filter on `scope_type` (policy sets only). Repeatable; repeated
   * instances OR across values. See `FilterValues` in the shared spec for the full
   * wire convention.
   *
   * Allowed values: `zone`, `resource`, `user`, `session`. Unknown values return 400
   * with the list of allowed values. Comma-separated single values are rejected with
   * a 400 pointing at the repeated-parameter OR form.
   *
   * Note: the allowed-value enum is enforced in the handler (not as an OpenAPI
   * `items.enum`) so the server can return a targeted error for the comma-AND form
   * instead of a generic "not in allowed values" response.
   */
  'filter[scope_type]'?: Array<string>;

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
   * Query param: Field to sort by.
   */
  sort?: 'created_at';

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
