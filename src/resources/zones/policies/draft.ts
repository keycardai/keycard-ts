// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PoliciesAPI from './policies';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Mutable policy authoring workspace
 */
export class Draft extends APIResource {
  /**
   * Get the draft for a policy
   */
  retrieve(
    policyID: string,
    params: DraftRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<PoliciesAPI.PolicyDraft> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policies/${policyID}/draft`, {
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
   * Delete a policy draft
   */
  delete(policyID: string, params: DraftDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zone_id, 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/zones/${zone_id}/policies/${policyID}/draft`, {
      ...options,
      headers: buildHeaders([
        {
          Accept: '*/*',
          ...(xAPIVersion != null ? { 'X-API-Version': xAPIVersion } : undefined),
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Create or update a policy draft
   */
  upsert(
    policyID: string,
    params: DraftUpsertParams,
    options?: RequestOptions,
  ): APIPromise<PoliciesAPI.PolicyDraft> {
    const {
      zone_id,
      format,
      validate_cedar,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.put(path`/zones/${zone_id}/policies/${policyID}/draft`, {
      query: { format, validate_cedar },
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
}

export interface DraftRetrieveParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Query param: Opt-in to additional response fields on a single resource (`user`).
   * Repeatable.
   */
  'expand[]'?: 'user' | Array<'user'>;

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

export interface DraftDeleteParams {
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

export interface DraftUpsertParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Body param
   */
  schema_version: string;

  /**
   * Query param: Response format override. `json` returns cedar_json, `cedar`
   * returns cedar_raw. When omitted, the response matches the input format.
   */
  format?: 'cedar' | 'json';

  /**
   * Query param: Whether to validate cedar_json against the schema. Defaults to
   * true.
   */
  validate_cedar?: boolean;

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

export declare namespace Draft {
  export {
    type DraftRetrieveParams as DraftRetrieveParams,
    type DraftDeleteParams as DraftDeleteParams,
    type DraftUpsertParams as DraftUpsertParams,
  };
}
