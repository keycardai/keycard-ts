// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Zone-scoped Cedar schema management
 */
export class PolicySchemas extends APIResource {
  /**
   * Get a policy schema by version
   */
  retrieve(
    version: string,
    params: PolicySchemaRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<SchemaVersionWithZoneInfo> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policy-schemas/${version}`, {
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
   * List policy schemas
   */
  list(
    zoneID: string,
    params: PolicySchemaListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PolicySchemaListResponse> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/zones/${zoneID}/policy-schemas`, {
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
   * Set the default policy schema for a zone
   */
  setDefault(
    version: string,
    params: PolicySchemaSetDefaultParams,
    options?: RequestOptions,
  ): APIPromise<SchemaVersionWithZoneInfo> {
    const { zone_id, body, 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.patch(path`/zones/${zone_id}/policy-schemas/${version}`, {
      body: body,
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

export interface SchemaVersion {
  created_at: string;

  status: 'active' | 'deprecated' | 'archived';

  updated_at: string;

  version: string;

  archived_at?: string | null;

  /**
   * Cedar schema in human-readable syntax. Populated when format=cedar.
   */
  cedar_schema?: string | null;

  /**
   * Cedar schema as JSON object. Populated when format=json (default).
   */
  cedar_schema_json?: unknown | null;

  deprecated_at?: string | null;
}

export interface SchemaVersionWithZoneInfo extends SchemaVersion {
  is_default: boolean;
}

export interface PolicySchemaListResponse {
  items: Array<SchemaVersionWithZoneInfo>;

  pagination: PolicySchemaListResponse.Pagination;
}

export namespace PolicySchemaListResponse {
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

export interface PolicySchemaRetrieveParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Query param: Schema representation format. `cedar` returns human-readable Cedar
   * syntax in `cedar_schema`, `json` returns Cedar JSON schema object in
   * `cedar_schema_json`.
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

export interface PolicySchemaListParams {
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
   * Query param: Schema representation format. `cedar` returns human-readable Cedar
   * syntax in `cedar_schema`, `json` returns Cedar JSON schema object in
   * `cedar_schema_json`.
   */
  format?: 'cedar' | 'json';

  /**
   * Query param: Filter schemas by default status. When `true`, returns only the
   * zone's default schema. When `false`, returns only non-default schemas. Omit to
   * return all schemas.
   */
  is_default?: boolean;

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

export interface PolicySchemaSetDefaultParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Body param
   */
  body?: unknown;

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

export declare namespace PolicySchemas {
  export {
    type SchemaVersion as SchemaVersion,
    type SchemaVersionWithZoneInfo as SchemaVersionWithZoneInfo,
    type PolicySchemaListResponse as PolicySchemaListResponse,
    type PolicySchemaRetrieveParams as PolicySchemaRetrieveParams,
    type PolicySchemaListParams as PolicySchemaListParams,
    type PolicySchemaSetDefaultParams as PolicySchemaSetDefaultParams,
  };
}
