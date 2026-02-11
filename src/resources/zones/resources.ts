// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ApplicationsAPI from './applications/applications';
import * as DependenciesAPI from './applications/dependencies';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Resources extends APIResource {
  /**
   * Creates a new Resource - a system that exposes protected information or
   * functionality requiring authentication
   */
  create(
    zoneID: string,
    body: ResourceCreateParams,
    options?: RequestOptions,
  ): APIPromise<DependenciesAPI.Resource> {
    return this._client.post(path`/zones/${zoneID}/resources`, { body, ...options, __security: {} });
  }

  /**
   * Returns details of a specific Resource by ID
   */
  retrieve(
    id: string,
    params: ResourceRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<DependenciesAPI.Resource> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/resources/${id}`, { ...options, __security: {} });
  }

  /**
   * Updates a Resource's configuration and metadata
   */
  update(
    id: string,
    params: ResourceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<DependenciesAPI.Resource> {
    const { zoneId, ...body } = params;
    return this._client.patch(path`/zones/${zoneId}/resources/${id}`, { body, ...options, __security: {} });
  }

  /**
   * Returns a list of resources in the specified zone
   */
  list(
    zoneID: string,
    query: ResourceListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ResourceListResponse> {
    return this._client.get(path`/zones/${zoneID}/resources`, { query, ...options, __security: {} });
  }

  /**
   * Permanently deletes a Resource
   */
  delete(id: string, params: ResourceDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/resources/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }
}

export interface ResourceListResponse {
  items: Array<DependenciesAPI.Resource>;
}

export interface ResourceCreateParams {
  /**
   * User specified identifier, unique within the zone
   */
  identifier: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * ID of the application that provides this resource
   */
  application_id?: string;

  /**
   * ID of the credential provider to associate with the resource
   */
  credential_provider_id?: string;

  /**
   * Human-readable description
   */
  description?: string | null;

  /**
   * Entity metadata
   */
  metadata?: ApplicationsAPI.Metadata;

  /**
   * Scopes supported by the resource
   */
  scopes?: Array<string>;
}

export interface ResourceRetrieveParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export interface ResourceUpdateParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Body param: ID of the application that provides this resource (set to null to
   * unset)
   */
  application_id?: string | null;

  /**
   * Body param: ID of the credential provider to associate with the resource (set to
   * null to unset)
   */
  credential_provider_id?: string | null;

  /**
   * Body param: Human-readable description
   */
  description?: string | null;

  /**
   * Body param: User specified identifier, unique within the zone
   */
  identifier?: string;

  /**
   * Body param: Entity metadata (set to null or {} to remove metadata)
   */
  metadata?: ApplicationsAPI.MetadataUpdate | null;

  /**
   * Body param: Human-readable name
   */
  name?: string;

  /**
   * Body param: Scopes supported by the resource (set to null to unset)
   */
  scopes?: Array<string> | null;
}

export interface ResourceListParams {
  /**
   * Filter resources by credential provider ID
   */
  credentialProviderId?: string;

  /**
   * Filter resources by identifier
   */
  identifier?: string;

  slug?: string;
}

export interface ResourceDeleteParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export declare namespace Resources {
  export {
    type ResourceListResponse as ResourceListResponse,
    type ResourceCreateParams as ResourceCreateParams,
    type ResourceRetrieveParams as ResourceRetrieveParams,
    type ResourceUpdateParams as ResourceUpdateParams,
    type ResourceListParams as ResourceListParams,
    type ResourceDeleteParams as ResourceDeleteParams,
  };
}
