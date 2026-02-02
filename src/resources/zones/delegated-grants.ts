// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProvidersAPI from './providers';
import * as UsersAPI from './users';
import * as DependenciesAPI from './applications/dependencies';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class DelegatedGrants extends APIResource {
  /**
   * Returns details of a specific delegated grant by grant ID
   */
  retrieve(id: string, params: DelegatedGrantRetrieveParams, options?: RequestOptions): APIPromise<Grant> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/delegated-grants/${id}`, { ...options, __security: {} });
  }

  /**
   * Revokes an active delegated grant
   */
  update(id: string, params: DelegatedGrantUpdateParams, options?: RequestOptions): APIPromise<Grant> {
    const { zoneId, ...body } = params;
    return this._client.patch(path`/zones/${zoneId}/delegated-grants/${id}`, {
      body,
      ...options,
      __security: {},
    });
  }

  /**
   * Returns a list of delegated grants in the specified zone. Can be filtered by
   * user, resource, or status.
   */
  list(
    zoneID: string,
    query: DelegatedGrantListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DelegatedGrantListResponse> {
    return this._client.get(path`/zones/${zoneID}/delegated-grants`, { query, ...options, __security: {} });
  }

  /**
   * Permanently revokes a delegated grant, removing the user's access to the
   * protected resource
   */
  delete(id: string, params: DelegatedGrantDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/delegated-grants/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }
}

/**
 * User authorization for a resource to be accessed on their behalf. The grant
 * links the user, resource, and the provider that issued the grant.
 */
export interface Grant {
  /**
   * Unique identifier of the delegated grant
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * Date when grant expires
   */
  expires_at: string;

  /**
   * Organization that owns this grant
   */
  organization_id: string;

  /**
   * ID of the provider that issued this grant
   */
  provider_id: string;

  /**
   * ID of resource receiving grant
   */
  resource_id: string;

  /**
   * Granted OAuth scopes
   */
  scopes: Array<string>;

  status: 'active' | 'expired' | 'revoked';

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Reference to the user granting permission
   */
  user_id: string;

  /**
   * Zone this grant belongs to
   */
  zone_id: string;

  /**
   * @deprecated Whether the grant is currently active (deprecated - use status
   * instead)
   */
  active?: boolean;

  /**
   * @deprecated A Provider is a system that supplies access to Resources and allows
   * actors (Users or Applications) to authenticate.
   */
  provider?: ProvidersAPI.Provider;

  /**
   * @deprecated A Resource is a system that exposes protected information or
   * functionality. It requires authentication of the requesting actor, which may be
   * a user or application, before allowing access.
   */
  resource?: DependenciesAPI.Resource;

  /**
   * @deprecated An authenticated user entity
   */
  user?: UsersAPI.User;
}

export interface DelegatedGrantListResponse {
  items: Array<Grant>;
}

export interface DelegatedGrantRetrieveParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export interface DelegatedGrantUpdateParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Body param
   */
  status: 'revoked';
}

export interface DelegatedGrantListParams {
  active?: 'true';

  /**
   * Filter by resource ID
   */
  resource_id?: string;

  status?: 'active' | 'expired' | 'revoked';

  /**
   * Filter by user ID
   */
  user_id?: string;
}

export interface DelegatedGrantDeleteParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export declare namespace DelegatedGrants {
  export {
    type Grant as Grant,
    type DelegatedGrantListResponse as DelegatedGrantListResponse,
    type DelegatedGrantRetrieveParams as DelegatedGrantRetrieveParams,
    type DelegatedGrantUpdateParams as DelegatedGrantUpdateParams,
    type DelegatedGrantListParams as DelegatedGrantListParams,
    type DelegatedGrantDeleteParams as DelegatedGrantDeleteParams,
  };
}
