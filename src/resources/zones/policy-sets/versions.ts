// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as VersionsAPI from '../policies/versions';
import * as PolicySetsAPI from './policy-sets';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Immutable policy set manifest snapshots
 */
export class Versions extends APIResource {
  /**
   * Validates the manifest, computes SHA, and creates an immutable version snapshot.
   */
  create(
    policySetID: string,
    params: VersionCreateParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetVersion> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.post(path`/zones/${zone_id}/policy-sets/${policySetID}/versions`, {
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
   * Get a specific policy set version
   */
  retrieve(
    versionID: string,
    params: VersionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetVersion> {
    const {
      zone_id,
      policy_set_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
    } = params;
    return this._client.get(path`/zones/${zone_id}/policy-sets/${policy_set_id}/versions/${versionID}`, {
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
   * Set active=true to bind this version as the active zone policy set.
   */
  update(
    versionID: string,
    params: VersionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetVersion> {
    const {
      zone_id,
      policy_set_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.patch(path`/zones/${zone_id}/policy-sets/${policy_set_id}/versions/${versionID}`, {
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
   * List versions of a policy set
   */
  list(
    policySetID: string,
    params: VersionListParams,
    options?: RequestOptions,
  ): APIPromise<VersionListResponse> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policy-sets/${policySetID}/versions`, {
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
   * Archive a policy set version
   */
  archive(
    versionID: string,
    params: VersionArchiveParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetVersion> {
    const {
      zone_id,
      policy_set_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
    } = params;
    return this._client.delete(path`/zones/${zone_id}/policy-sets/${policy_set_id}/versions/${versionID}`, {
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
   * Returns the policy versions referenced by this policy set version's manifest as
   * a paginated list.
   */
  listPolicies(
    versionID: string,
    params: VersionListPoliciesParams,
    options?: RequestOptions,
  ): APIPromise<VersionListPoliciesResponse> {
    const {
      zone_id,
      policy_set_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(
      path`/zones/${zone_id}/policy-sets/${policy_set_id}/versions/${versionID}/policies`,
      {
        query,
        ...options,
        headers: buildHeaders([
          {
            ...(xAPIVersion != null ? { 'X-API-Version': xAPIVersion } : undefined),
            ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
          },
          options?.headers,
        ]),
      },
    );
  }
}

export interface PolicySetVersion {
  id: string;

  created_at: string;

  created_by: string;

  manifest: PolicySetsAPI.PolicySetManifest;

  /**
   * Hex-encoded SHA-256 of the canonicalized manifest
   */
  manifest_sha: string;

  /**
   * Who manages this policy set version:
   *
   * - `"platform"` — managed by the Keycard platform (system policy set versions).
   * - `"customer"` — managed by the tenant (custom policy set versions).
   */
  owner_type: 'platform' | 'customer';

  policy_set_id: string;

  /**
   * Schema version pinned to this policy set version. Determines the Cedar schema
   * used for evaluation when activated.
   */
  schema_version: string;

  version: number;

  /**
   * Whether this policy set version is currently bound with mode='active'
   */
  active?: boolean;

  archived_at?: string | null;

  archived_by?: string | null;

  /**
   * Decoded content of an Attestation JWS payload. Describes the exact policy set
   * version composition at attestation time. This schema defines what consumers see
   * after base64url-decoding the Attestation.payload field.
   */
  attestation?: PolicySetsAPI.AttestationStatement | null;
}

export interface VersionListResponse {
  items: Array<PolicySetVersion>;

  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  pagination: VersionListResponse.Pagination;
}

export namespace VersionListResponse {
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

export interface VersionListPoliciesResponse {
  items: Array<VersionsAPI.PolicyVersion>;

  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  pagination: VersionListPoliciesResponse.Pagination;
}

export namespace VersionListPoliciesResponse {
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

export interface VersionCreateParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Body param
   */
  manifest: PolicySetsAPI.PolicySetManifest;

  /**
   * Body param: Schema version to pin to this policy set version.
   */
  schema_version: string;

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

export interface VersionRetrieveParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Path param: The policy set identifier
   */
  policy_set_id: string;

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

export interface VersionUpdateParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Path param: The policy set identifier
   */
  policy_set_id: string;

  /**
   * Body param: Must be true. Binds this version as the active zone policy set.
   */
  active: true;

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

export interface VersionListParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

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
   * Query param: Maximum number of items to return per page.
   */
  limit?: number;

  /**
   * Query param: Sort direction. Default is desc (newest first).
   */
  order?: 'asc' | 'desc';

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

export interface VersionArchiveParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Path param: The policy set identifier
   */
  policy_set_id: string;

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

export interface VersionListPoliciesParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Path param: The policy set identifier
   */
  policy_set_id: string;

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
   * Query param: Policy representation format. `json` returns cedar_json, `cedar`
   * returns cedar_raw.
   */
  format?: 'cedar' | 'json';

  /**
   * Query param: Maximum number of items to return per page.
   */
  limit?: number;

  /**
   * Query param: Sort direction. Default is desc (newest first).
   */
  order?: 'asc' | 'desc';

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

export declare namespace Versions {
  export {
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
