// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Policy set binding management. Active slots are replace-only by design:
 * once bound (at zone bootstrap or on a principal's first policy check), an
 * active slot is never emptied — evaluation fails closed, so an empty active
 * slot would deny all access. Replace the bound version rather than removing
 * the binding. DELETE applies to shadow bindings only.
 */
export class PolicyBindings extends APIResource {
  /**
   * Returns a specific binding by its stable identifier.
   */
  retrieve(
    bindingID: string,
    params: PolicyBindingRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetBinding> {
    const { zone_id, 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.get(path`/zones/${zone_id}/policy-bindings/${bindingID}`, {
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
   * Returns bindings for the zone, filtered by target and mode.
   *
   * `filter[target_type]` defaults to `zone` and `filter[mode]` defaults to `shadow`
   * when omitted (preserving the endpoint's historical shadow-only listing); pass
   * explicit values to widen. The deprecated bare `scope_type` and `mode` parameters
   * are honored as equivalents and suppress the respective defaults; supplying a
   * bare parameter and its `filter[...]` form with different values returns 400.
   * With an effective target type set of exactly `zone`, `filter[target_id]` values
   * other than the zone ID return 400.
   */
  list(
    zoneID: string,
    params: PolicyBindingListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PolicyBindingListResponse> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/zones/${zoneID}/policy-bindings`, {
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
   * Removes a binding by its identifier, stopping evaluation for that slot.
   */
  delete(bindingID: string, params: PolicyBindingDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zone_id, 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/zones/${zone_id}/policy-bindings/${bindingID}`, {
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
   * Returns shadow evaluation metrics for a specific binding. Use query parameters
   * to change scope:
   *
   * - `scope=zone` — zone-level aggregate across all pairings
   * - `psv_id=<id>` — metrics for a specific policy set version (in any role),
   *   including per-pairing breakdown
   */
  retrieveMetrics(
    bindingID: string,
    params: PolicyBindingRetrieveMetricsParams,
    options?: RequestOptions,
  ): APIPromise<PolicyBindingRetrieveMetricsResponse> {
    const {
      zone_id,
      'X-API-Version': xAPIVersion,
      'X-Client-Request-ID': xClientRequestID,
      ...query
    } = params;
    return this._client.get(path`/zones/${zone_id}/policy-bindings/${bindingID}/metrics`, {
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
   * Upserts a binding for a slot identified by (scope_type, scope_target_id, mode).
   * If a binding already exists for the slot, it is replaced. The binding ID is
   * stable per slot and survives replacements.
   */
  set(
    zoneID: string,
    params: PolicyBindingSetParams,
    options?: RequestOptions,
  ): APIPromise<PolicySetBinding> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.put(path`/zones/${zoneID}/policy-bindings`, {
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

export interface PolicySetBinding {
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

export interface PolicyBindingListResponse {
  items: Array<PolicySetBinding>;
}

export interface PolicyBindingRetrieveMetricsResponse {
  agree_count: number;

  shadow_allow_active_deny_count: number;

  shadow_deny_active_allow_count: number;

  since: string;

  total_evaluations: number;

  /**
   * Fraction of evaluations where active and shadow decisions agreed (0.0–1.0)
   */
  agreement_rate?: number;

  avg_shadow_duration_ms?: number;

  /**
   * Per-pairing breakdown. Present when querying by PSV.
   */
  pairings?: Array<PolicyBindingRetrieveMetricsResponse.Pairing>;

  stddev_shadow_duration_ms?: number;
}

export namespace PolicyBindingRetrieveMetricsResponse {
  export interface Pairing {
    active_psv_id: string;

    agree_count: number;

    first_eval: string;

    last_eval: string;

    shadow_psv_id: string;

    total: number;
  }
}

export interface PolicyBindingRetrieveParams {
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

export interface PolicyBindingListParams {
  /**
   * Query param: Filter on binding `mode`. Repeatable; repeated instances OR across
   * values. See `FilterValues` in the shared spec for the full wire convention.
   *
   * Allowed values: `active`, `shadow`. Unknown values return 400 with the list of
   * allowed values. Comma-separated single values are rejected with a 400 pointing
   * at the repeated-parameter OR form.
   *
   * **Defaults to `shadow`** when omitted (and the deprecated bare `mode` parameter
   * is absent), preserving the endpoint's historical shadow-only listing. Pass
   * `filter[mode]=active` (or both values) to widen.
   */
  'filter[mode]'?: Array<string>;

  /**
   * Query param: Filter on `target_id`. Repeatable; repeated instances OR across
   * values. See `FilterValues` in the shared spec for the full wire convention.
   *
   * Zone-targeted elements carry the zone ID as their `target_id`. When the
   * effective `filter[target_type]` set is exactly `zone` (including via its
   * default), any `filter[target_id]` value other than the path `zone_id` returns
   * `400 Bad Request`.
   */
  'filter[target_id]'?: Array<string>;

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
   * Query param: **Deprecated.** Use `filter[mode]` instead. Still honored for
   * backward compatibility but only accepts `shadow`; other values return 400.
   * Conflicts with `filter[mode]` return 400.
   */
  mode?: 'shadow';

  /**
   * Query param: **Deprecated.** Use `filter[target_type]` instead. Still honored
   * for backward compatibility but only accepts `zone`; other values return 400.
   * Conflicts with `filter[target_type]` return 400.
   */
  scope_type?: 'zone';

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

export interface PolicyBindingDeleteParams {
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

export interface PolicyBindingRetrieveMetricsParams {
  /**
   * Path param: The zone identifier
   */
  zone_id: string;

  /**
   * Query param: Policy set to filter metrics for. Required when psv_id is provided.
   */
  policy_set_id?: string;

  /**
   * Query param: Filter to a specific policy set version (in any role). When
   * provided, response includes per-pairing breakdown. Requires policy_set_id.
   */
  psv_id?: string;

  /**
   * Query param: Metrics scope. `binding` (default) returns metrics for this
   * binding. `zone` returns zone-level aggregate across all pairings.
   */
  scope?: 'binding' | 'zone';

  /**
   * Query param: Start of the time window (default 24h ago)
   */
  since?: string;

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

export interface PolicyBindingSetParams {
  /**
   * Body param: Binding mode
   */
  mode: 'shadow';

  /**
   * Body param: Public ID of the policy set to bind
   */
  policy_set_id: string;

  /**
   * Body param: Public ID of the policy set version to bind
   */
  policy_set_version_id: string;

  /**
   * @deprecated Body param: **Deprecated.** Use `target_id` instead.
   */
  scope_target_id?: string;

  /**
   * @deprecated Body param: **Deprecated.** Use `target_type` instead.
   */
  scope_type?: 'zone';

  /**
   * Body param: Defaults to zone_id for zone targets. Required for other targets.
   */
  target_id?: string;

  /**
   * Body param: What the binding targets. Only `zone` is supported for direct
   * binding writes.
   */
  target_type?: 'zone';

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

export declare namespace PolicyBindings {
  export {
    type PolicySetBinding as PolicySetBinding,
    type PolicyBindingListResponse as PolicyBindingListResponse,
    type PolicyBindingRetrieveMetricsResponse as PolicyBindingRetrieveMetricsResponse,
    type PolicyBindingRetrieveParams as PolicyBindingRetrieveParams,
    type PolicyBindingListParams as PolicyBindingListParams,
    type PolicyBindingDeleteParams as PolicyBindingDeleteParams,
    type PolicyBindingRetrieveMetricsParams as PolicyBindingRetrieveMetricsParams,
    type PolicyBindingSetParams as PolicyBindingSetParams,
  };
}
