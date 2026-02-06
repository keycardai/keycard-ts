// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ApplicationCredentialsAPI from '../application-credentials';
import * as ZonesAPI from '../zones';
import * as DependenciesAPI from './dependencies';
import {
  Dependencies,
  DependencyAddParams,
  DependencyListParams,
  DependencyListResponse,
  DependencyRemoveParams,
  DependencyRetrieveParams,
  Resource,
} from './dependencies';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Applications extends APIResource {
  dependencies: DependenciesAPI.Dependencies = new DependenciesAPI.Dependencies(this._client);

  /**
   * Creates a new Application - a software system with an identity that can access
   * Resources
   */
  create(zoneID: string, body: ApplicationCreateParams, options?: RequestOptions): APIPromise<Application> {
    return this._client.post(path`/zones/${zoneID}/applications`, { body, ...options });
  }

  /**
   * Returns details of a specific Application by ID
   */
  retrieve(id: string, params: ApplicationRetrieveParams, options?: RequestOptions): APIPromise<Application> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/applications/${id}`, options);
  }

  /**
   * Updates an Application's configuration and metadata
   */
  update(id: string, params: ApplicationUpdateParams, options?: RequestOptions): APIPromise<Application> {
    const { zoneId, ...body } = params;
    return this._client.patch(path`/zones/${zoneId}/applications/${id}`, { body, ...options });
  }

  /**
   * Returns a list of applications in the specified zone
   */
  list(
    zoneID: string,
    query: ApplicationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ApplicationListResponse> {
    return this._client.get(path`/zones/${zoneID}/applications`, { query, ...options });
  }

  /**
   * Permanently deletes an application
   */
  delete(id: string, params: ApplicationDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/applications/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Returns a list of application credentials for a specific application
   */
  listCredentials(
    id: string,
    params: ApplicationListCredentialsParams,
    options?: RequestOptions,
  ): APIPromise<ApplicationListCredentialsResponse> {
    const { zoneId, ...query } = params;
    return this._client.get(path`/zones/${zoneId}/applications/${id}/application-credentials`, {
      query,
      ...options,
    });
  }

  /**
   * Returns a list of resources provided by an application
   */
  listResources(
    id: string,
    params: ApplicationListResourcesParams,
    options?: RequestOptions,
  ): APIPromise<ApplicationListResourcesResponse> {
    const { zoneId, ...query } = params;
    return this._client.get(path`/zones/${zoneId}/applications/${id}/resources`, { query, ...options });
  }
}

/**
 * An Application is a software system with an associated identity that can access
 * Resources. It may act on its own behalf (machine-to-machine) or on behalf of a
 * user (delegated access).
 */
export interface Application {
  /**
   * Unique identifier of the application
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * Number of resource dependencies
   */
  dependencies_count: number;

  /**
   * User specified identifier, unique within the zone
   */
  identifier: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * Organization that owns this application
   */
  organization_id: string;

  /**
   * URL-safe identifier, unique within the zone
   */
  slug: string;

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Zone this application belongs to
   */
  zone_id: string;

  /**
   * Human-readable description
   */
  description?: string | null;

  /**
   * Entity metadata
   */
  metadata?: Metadata;

  /**
   * Protocol-specific configuration
   */
  protocols?: Application.Protocols | null;

  /**
   * Traits of the application
   */
  traits?: Array<ApplicationTrait> | null;
}

export namespace Application {
  /**
   * Protocol-specific configuration
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration
     */
    oauth2?: Protocols.Oauth2 | null;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration
     */
    export interface Oauth2 {
      /**
       * OAuth 2.0 post-logout redirect URIs for this application
       */
      post_logout_redirect_uris?: Array<string> | null;

      /**
       * OAuth 2.0 redirect URIs for this application
       */
      redirect_uris?: Array<string> | null;
    }
  }
}

/**
 * Traits ascribe behaviors and characteristics to an application, which may
 * activate trait-specific user experiences, workflows, or other system behaviors
 */
export type ApplicationTrait = 'gateway' | 'mcp-provider';

/**
 * Entity metadata
 */
export interface Metadata {
  /**
   * Documentation URL
   */
  docs_url?: string;
}

/**
 * Entity metadata (set to null or {} to remove metadata)
 */
export interface MetadataUpdate {
  /**
   * Documentation URL (set to null to unset)
   */
  docs_url?: string | null;
}

export interface ApplicationListResponse {
  items: Array<Application>;

  /**
   * Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;
}

export interface ApplicationListCredentialsResponse {
  items: Array<ApplicationCredentialsAPI.Credential>;

  /**
   * Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;
}

export interface ApplicationListResourcesResponse {
  items: Array<DependenciesAPI.Resource>;

  /**
   * Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;
}

export interface ApplicationCreateParams {
  /**
   * User specified identifier, unique within the zone
   */
  identifier: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * Dependencies of the application
   */
  dependencies?: Array<ApplicationCreateParams.Dependency>;

  /**
   * Human-readable description
   */
  description?: string | null;

  /**
   * Entity metadata
   */
  metadata?: Metadata;

  /**
   * Protocol-specific configuration for application creation
   */
  protocols?: ApplicationCreateParams.Protocols;

  /**
   * Traits of the application
   */
  traits?: Array<ApplicationTrait>;
}

export namespace ApplicationCreateParams {
  export interface Dependency {
    /**
     * Resource identifier
     */
    id: string;

    type?: string;
  }

  /**
   * Protocol-specific configuration for application creation
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for application creation
     */
    oauth2?: Protocols.Oauth2;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for application creation
     */
    export interface Oauth2 {
      /**
       * OAuth 2.0 post-logout redirect URIs for this application
       */
      post_logout_redirect_uris?: Array<string>;

      /**
       * OAuth 2.0 redirect URIs for this application
       */
      redirect_uris?: Array<string>;
    }
  }
}

export interface ApplicationRetrieveParams {
  zoneId: string;
}

export interface ApplicationUpdateParams {
  /**
   * Path param
   */
  zoneId: string;

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
  metadata?: MetadataUpdate | null;

  /**
   * Body param: Human-readable name
   */
  name?: string;

  /**
   * Body param: Protocol-specific configuration for application update
   */
  protocols?: ApplicationUpdateParams.Protocols | null;

  /**
   * Body param: Traits of the application
   */
  traits?: Array<ApplicationTrait> | null;
}

export namespace ApplicationUpdateParams {
  /**
   * Protocol-specific configuration for application update
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for application update
     */
    oauth2?: Protocols.Oauth2 | null;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for application update
     */
    export interface Oauth2 {
      /**
       * OAuth 2.0 post-logout redirect URIs for this application (set to null or [] to
       * unset)
       */
      post_logout_redirect_uris?: Array<string> | null;

      /**
       * OAuth 2.0 redirect URIs for this application (set to null or [] to unset)
       */
      redirect_uris?: Array<string> | null;
    }
  }
}

export interface ApplicationListParams {
  cursor?: string;

  identifier?: string;

  limit?: number;

  slug?: string;

  /**
   * Filter by traits (OR matching - returns applications with any of the specified
   * traits)
   */
  traits?: Array<ApplicationTrait>;

  /**
   * Filter by traits (AND matching - returns applications with all of the specified
   * traits)
   */
  'traits[all]'?: Array<ApplicationTrait>;
}

export interface ApplicationDeleteParams {
  zoneId: string;
}

export interface ApplicationListCredentialsParams {
  /**
   * Path param
   */
  zoneId: string;

  /**
   * Query param
   */
  cursor?: string;

  /**
   * Query param
   */
  limit?: number;
}

export interface ApplicationListResourcesParams {
  /**
   * Path param
   */
  zoneId: string;

  /**
   * Query param
   */
  cursor?: string;

  /**
   * Query param
   */
  limit?: number;
}

Applications.Dependencies = Dependencies;

export declare namespace Applications {
  export {
    type Application as Application,
    type ApplicationTrait as ApplicationTrait,
    type Metadata as Metadata,
    type MetadataUpdate as MetadataUpdate,
    type ApplicationListResponse as ApplicationListResponse,
    type ApplicationListCredentialsResponse as ApplicationListCredentialsResponse,
    type ApplicationListResourcesResponse as ApplicationListResourcesResponse,
    type ApplicationCreateParams as ApplicationCreateParams,
    type ApplicationRetrieveParams as ApplicationRetrieveParams,
    type ApplicationUpdateParams as ApplicationUpdateParams,
    type ApplicationListParams as ApplicationListParams,
    type ApplicationDeleteParams as ApplicationDeleteParams,
    type ApplicationListCredentialsParams as ApplicationListCredentialsParams,
    type ApplicationListResourcesParams as ApplicationListResourcesParams,
  };

  export {
    Dependencies as Dependencies,
    type Resource as Resource,
    type DependencyListResponse as DependencyListResponse,
    type DependencyRetrieveParams as DependencyRetrieveParams,
    type DependencyListParams as DependencyListParams,
    type DependencyAddParams as DependencyAddParams,
    type DependencyRemoveParams as DependencyRemoveParams,
  };
}
