// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as VersionsAPI from './versions';
import {
  PolicyVersion,
  VersionArchiveParams,
  VersionCreateParams,
  VersionListParams,
  VersionListResponse,
  VersionRetrieveParams,
  Versions,
} from './versions';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Policy CRUD operations
 */
export class Policies extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Create a new policy
   */
  create(zoneID: string, params: PolicyCreateParams, options?: RequestOptions): APIPromise<Policy> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/zones/${zoneID}/policies`, {
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
   * Get a policy by ID
   */
  retrieve(policyID: string, params: PolicyRetrieveParams, options?: RequestOptions): APIPromise<Policy> {
    const { zone_id, 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.get(path`/zones/${zone_id}/policies/${policyID}`, {
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
   * Update a policy
   */
  update(policyID: string, params: PolicyUpdateParams, options?: RequestOptions): APIPromise<Policy> {
    const {
      zone_id,
      'If-Match': ifMatch,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.patch(path`/zones/${zone_id}/policies/${policyID}`, {
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
   * List policies in a zone
   */
  list(
    zoneID: string,
    params: PolicyListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PolicyListResponse> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/zones/${zoneID}/policies`, {
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
   * Archive a policy
   */
  archive(policyID: string, params: PolicyArchiveParams, options?: RequestOptions): APIPromise<Policy> {
    const { zone_id, 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/zones/${zone_id}/policies/${policyID}`, {
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

export interface Policy {
  id: string;

  created_at: string;

  created_by: string;

  name: string;

  /**
   * Who manages this policy:
   *
   * - `"platform"` — managed by the Keycard platform (system policies).
   * - `"customer"` — managed by the tenant (custom policies).
   */
  owner_type: 'platform' | 'customer';

  updated_at: string;

  zone_id: string;

  archived_at?: string | null;

  description?: string | null;

  /**
   * Human-readable version number of the latest version (e.g., 1, 2, 3)
   */
  latest_version?: number | null;

  latest_version_id?: string | null;

  updated_by?: string | null;
}

export interface PolicyDraft {
  created_at: string;

  policy_id: string;

  schema_version: string;

  updated_at: string;

  updated_by: string;

  /**
   * ID of the policy version this draft was hydrated from. Null when the draft was
   * created without an existing version.
   */
  base_version_id?: string | null;

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

export interface PolicyListResponse {
  items: Array<Policy>;

  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  pagination: PolicyListResponse.Pagination;
}

export namespace PolicyListResponse {
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

export interface PolicyCreateParams {
  /**
   * Body param
   */
  name: string;

  /**
   * Body param
   */
  description?: string;

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

export interface PolicyRetrieveParams {
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

export interface PolicyUpdateParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Body param
   */
  description?: string;

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

export interface PolicyListParams {
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
   * Query param: Case-insensitive substring search on `description` (policies only).
   * Repeatable; if multiple terms are supplied they are OR-ed.
   */
  'query[description]'?: Array<string>;

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

export interface PolicyArchiveParams {
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

Policies.Versions = Versions;

export declare namespace Policies {
  export {
    type Policy as Policy,
    type PolicyDraft as PolicyDraft,
    type PolicyListResponse as PolicyListResponse,
    type PolicyCreateParams as PolicyCreateParams,
    type PolicyRetrieveParams as PolicyRetrieveParams,
    type PolicyUpdateParams as PolicyUpdateParams,
    type PolicyListParams as PolicyListParams,
    type PolicyArchiveParams as PolicyArchiveParams,
  };

  export {
    Versions as Versions,
    type PolicyVersion as PolicyVersion,
    type VersionListResponse as VersionListResponse,
    type VersionCreateParams as VersionCreateParams,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionListParams as VersionListParams,
    type VersionArchiveParams as VersionArchiveParams,
  };
}
