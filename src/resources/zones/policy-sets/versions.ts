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
      __security: {},
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
      __security: {},
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
      __security: {},
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
      __security: {},
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
      __security: {},
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
        __security: {},
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

  policy_set_id: string;

  schema_version: string;

  version: number;

  /**
   * Whether this policy set version is currently bound with mode='active'
   */
  active?: boolean;

  archived_at?: string | null;

  archived_by?: string | null;

  /**
   * JWS Flattened JSON Serialization (RFC 7515 §7.2.2) of a policy set attestation.
   * The protected header carries the signing algorithm and key identifier; the
   * payload is a base64url-encoded AttestationStatement canonicalized per RFC 8785
   * (JCS). Verify using the zone JWKS endpoint (RFC 7517). Currently signed with
   * RS256; future zone key types (e.g. EdDSA) will be indicated by the "alg" header
   * — no envelope changes required.
   */
  attestation?: PolicySetsAPI.Attestation | null;
}

export interface VersionListResponse {
  items: Array<PolicySetVersion>;

  pagination: VersionListResponse.Pagination;
}

export namespace VersionListResponse {
  export interface Pagination {
    /**
     * Cursor of the last item on the current page. Pass to after for the next page.
     * Null when there is no next page.
     */
    after_cursor: string | null;

    /**
     * Cursor of the first item on the current page. Pass to before for the previous
     * page. Null when there is no previous page.
     */
    before_cursor: string | null;

    /**
     * Total number of items matching the current filters. Only included when
     * expand=total_count is requested.
     */
    total_count?: number | null;
  }
}

export interface VersionListPoliciesResponse {
  items: Array<VersionsAPI.PolicyVersion>;

  pagination: VersionListPoliciesResponse.Pagination;
}

export namespace VersionListPoliciesResponse {
  export interface Pagination {
    /**
     * Cursor of the last item on the current page. Pass to after for the next page.
     * Null when there is no next page.
     */
    after_cursor: string | null;

    /**
     * Cursor of the first item on the current page. Pass to before for the previous
     * page. Null when there is no previous page.
     */
    before_cursor: string | null;

    /**
     * Total number of items matching the current filters. Only included when
     * expand=total_count is requested.
     */
    total_count?: number | null;
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
   * Body param
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
   * Query param: Return items after this cursor (forward pagination). Use
   * after_cursor from a previous response. Mutually exclusive with before.
   */
  after?: string;

  /**
   * Query param: Return items before this cursor (backward pagination). Use
   * before_cursor from a previous response. Mutually exclusive with after.
   */
  before?: string;

  /**
   * Query param: Opt-in to additional response fields
   */
  expand?: Array<'total_count'>;

  /**
   * Query param: Maximum number of items to return
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
   * Query param: Return items after this cursor (forward pagination). Use
   * after_cursor from a previous response. Mutually exclusive with before.
   */
  after?: string;

  /**
   * Query param: Return items before this cursor (backward pagination). Use
   * before_cursor from a previous response. Mutually exclusive with after.
   */
  before?: string;

  /**
   * Query param: Opt-in to additional response fields
   */
  expand?: Array<'total_count'>;

  /**
   * Query param: Policy representation format. `json` returns cedar_json, `cedar`
   * returns cedar_raw.
   */
  format?: 'cedar' | 'json';

  /**
   * Query param: Maximum number of items to return
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
