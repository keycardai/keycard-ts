// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as VersionsAPI from '../policies/versions';
import * as PolicySetsAPI from './policy-sets';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Mutable policy set manifest workspace
 */
export class Draft extends APIResource {
  /**
   * Safe draft creation that never overwrites an existing draft. If a draft already
   * exists for this policy set, it is returned as-is (200 OK). Three body modes
   * control how a new draft is initialized: (1) empty body — hydrate from the latest
   * non-archived version, (2) { base_version_id } — hydrate from a specific version,
   * (3) full body with manifest and schema_version — create with explicit content.
   * base_version_id and manifest are mutually exclusive; providing both is rejected.
   */
  create(
    policySetID: string,
    params: DraftCreateParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetsAPI.PolicySetDraft> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.post(path`/zones/${zone_id}/policy-sets/${policySetID}/draft`, {
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
   * Get the draft for a policy set
   */
  retrieve(
    policySetID: string,
    params: DraftRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetsAPI.PolicySetDraft> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policy-sets/${policySetID}/draft`, {
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
   * Applies partial updates to an existing draft. Supports updating metadata fields
   * (name, description, schema_version) and manifest operations (set, add, remove
   * entries).
   */
  update(
    policySetID: string,
    params: DraftUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetsAPI.PolicySetDraft> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.patch(path`/zones/${zone_id}/policy-sets/${policySetID}/draft`, {
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
   * Delete a policy set draft
   */
  delete(policySetID: string, params: DraftDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zone_id, 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/zones/${zone_id}/policy-sets/${policySetID}/draft`, {
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
   * Returns the policy versions referenced by the draft's manifest as a paginated
   * list. Mirrors the published
   * `/policy-sets/{policy_set_id}/versions/{version_id}/policies` endpoint but
   * sources entries from the policy set's mutable draft. Archived policy versions
   * referenced by the manifest are still returned.
   */
  listPolicies(
    policySetID: string,
    params: DraftListPoliciesParams,
    options?: RequestOptions,
  ): APIPromise<DraftListPoliciesResponse> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policy-sets/${policySetID}/draft/policies`, {
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
   * Full replacement of the draft state. Creates the draft if it does not exist,
   * replaces it if it does. Standard REST PUT idempotency — the caller provides the
   * complete desired state.
   */
  upsert(
    policySetID: string,
    params: DraftUpsertParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetsAPI.PolicySetDraft> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...body
    } = params;
    return this._client.put(path`/zones/${zone_id}/policy-sets/${policySetID}/draft`, {
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

export interface DraftListPoliciesResponse {
  items: Array<VersionsAPI.PolicyVersion>;

  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  pagination: DraftListPoliciesResponse.Pagination;
}

export namespace DraftListPoliciesResponse {
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

export interface DraftCreateParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Body param: ID of a policy set version to hydrate from. Mutually exclusive with
   * manifest — the server rejects requests containing both fields.
   */
  base_version_id?: string;

  /**
   * Body param
   */
  description?: string;

  /**
   * Body param
   */
  manifest?: PolicySetsAPI.PolicySetManifest;

  /**
   * Body param
   */
  name?: string;

  /**
   * Body param
   */
  schema_version?: string;

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
   * Header param: API version header (date-based, e.g. 2026-02-01)
   */
  'X-API-Version'?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface DraftUpdateParams {
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
  manifest_operations?: Array<DraftUpdateParams.ManifestOperation>;

  /**
   * Body param
   */
  name?: string;

  /**
   * Body param
   */
  schema_version?: string;

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

export namespace DraftUpdateParams {
  export interface ManifestOperation {
    /**
     * set: Replace policy_version_id for an existing entry matching policy_id. add:
     * Append a new entry with the given policy_id and policy_version_id. remove:
     * Remove the entry matching policy_id.
     */
    op: 'set' | 'add' | 'remove';

    policy_id: string;

    /**
     * Required for set and add operations. Ignored for remove.
     */
    policy_version_id?: string;
  }
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

export interface DraftListPoliciesParams {
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
   * Query param: Opt-in to additional response fields (`total_count`, `user`).
   * Repeatable; matches the `expand[]` convention used across the Keycard API.
   */
  'expand[]'?: 'total_count' | 'user' | Array<'total_count' | 'user'>;

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

export interface DraftUpsertParams {
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
   * Body param
   */
  description?: string;

  /**
   * Body param
   */
  name?: string;

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
    type DraftListPoliciesResponse as DraftListPoliciesResponse,
    type DraftCreateParams as DraftCreateParams,
    type DraftRetrieveParams as DraftRetrieveParams,
    type DraftUpdateParams as DraftUpdateParams,
    type DraftDeleteParams as DraftDeleteParams,
    type DraftListPoliciesParams as DraftListPoliciesParams,
    type DraftUpsertParams as DraftUpsertParams,
  };
}
