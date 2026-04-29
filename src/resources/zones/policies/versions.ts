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

  /**
   * Who manages this policy version:
   *
   * - `"platform"` — managed by the Keycard platform (system policy versions).
   * - `"customer"` — managed by the tenant (custom policy versions).
   */
  owner_type: 'platform' | 'customer';

  policy_id: string;

  /**
   * Schema version this policy was validated against when created.
   */
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
   * Cedar policy in JSON representation. Populated by default and when `format=json`
   * is passed; null when `format=cedar` narrows the response to the text
   * representation only.
   */
  cedar_json?: unknown | null;

  /**
   * Cedar policy in human-readable syntax. Populated by default and when
   * `format=cedar` is passed; null when `format=json` narrows the response to the
   * JSON representation only.
   */
  cedar_raw?: string | null;
}

export interface VersionListResponse {
  items: Array<PolicyVersion>;

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

export interface VersionCreateParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Body param: Schema version to validate this policy against. Must not be
   * archived.
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
   * Query param: Narrows which Cedar representation the response includes. When
   * omitted, both `cedar_json` and `cedar_raw` are populated. Pass `json` to receive
   * only `cedar_json`, or `cedar` to receive only `cedar_raw`. Callers that don't
   * care about payload size can skip this parameter.
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
   * Query param: Narrows which Cedar representation the response includes. When
   * omitted, both `cedar_json` and `cedar_raw` are populated. Pass `json` to receive
   * only `cedar_json`, or `cedar` to receive only `cedar_raw`. Callers that don't
   * care about payload size can skip this parameter.
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
