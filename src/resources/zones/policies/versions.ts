// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Immutable policy version snapshots
 */
export class Versions extends APIResource {
  /**
   * Create a new immutable policy version
   */
  create(policyID: string, params: VersionCreateParams, options?: RequestOptions): APIPromise<PolicyVersion> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.post(path`/zones/${zone_id}/policies/${policyID}/versions`, {
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
   * Get a specific policy version
   */
  retrieve(
    versionID: string,
    params: VersionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<PolicyVersion> {
    const {
      zone_id,
      policy_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policies/${policy_id}/versions/${versionID}`, {
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
   * List versions of a policy
   */
  list(
    policyID: string,
    params: VersionListParams,
    options?: RequestOptions,
  ): APIPromise<VersionListResponse> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policies/${policyID}/versions`, {
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
   * Archive a policy version
   */
  archive(
    versionID: string,
    params: VersionArchiveParams,
    options?: RequestOptions,
  ): APIPromise<PolicyVersion> {
    const {
      zone_id,
      policy_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
    } = params;
    return this._client.delete(path`/zones/${zone_id}/policies/${policy_id}/versions/${versionID}`, {
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
}

export interface PolicyVersion {
  id: string;

  created_at: string;

  created_by: string;

  policy_id: string;

  schema_version: string;

  /**
   * Hex-encoded content hash
   */
  sha: string;

  version: number;

  zone_id: string;

  archived_at?: string | null;

  archived_by?: string | null;

  /**
   * Cedar policy in JSON representation. Populated when format=json (default).
   */
  cedar_json?: unknown | null;

  /**
   * Cedar policy in human-readable syntax. Populated when format=cedar.
   */
  cedar_raw?: string | null;
}

export interface VersionListResponse {
  items: Array<PolicyVersion>;

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

export interface VersionCreateParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Body param
   */
  schema_version: string;

  /**
   * Body param: Cedar policy in JSON representation. Mutually exclusive with
   * cedar_raw.
   */
  cedar_json?: unknown | null;

  /**
   * Body param: Cedar policy in human-readable Cedar syntax. Mutually exclusive with
   * cedar_json.
   */
  cedar_raw?: string | null;

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
   * Path param: The policy identifier
   */
  policy_id: string;

  /**
   * Query param: Policy representation format. `json` returns cedar_json, `cedar`
   * returns cedar_raw.
   */
  format?: 'cedar' | 'json';

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

export interface VersionArchiveParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Path param: The policy identifier
   */
  policy_id: string;

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
    type PolicyVersion as PolicyVersion,
    type VersionListResponse as VersionListResponse,
    type VersionCreateParams as VersionCreateParams,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionListParams as VersionListParams,
    type VersionArchiveParams as VersionArchiveParams,
  };
}
