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
   * Returns a paginated list of applications in the specified zone. Use cursor
   * pagination via `after`/`before`. Sort: comma-separated field list; prefix with
   * `-` for descending. Use `expand[]=total_count` to include the matching row
   * count. Filter by exact slug via `filter[slug]` and by exact identifier via
   * `filter[identifier]`. Search via `query[name]` / `query[identifier]` / `query[]`
   * (substring match, OR'd across repeated values). `query[]` matches against name
   * and identifier. Pass `filter[id]` (repeatable, max 100) to restrict results to a
   * known set of applications — mutually exclusive with `after`/`before` (returns
   * 400 if combined). When `filter[id]` is set, `limit` is ignored and the response
   * contains every requested application that exists in the zone, in a single page.
   * IDs not in the zone are silently omitted.
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
   * Consent mode for the application. 'implicit' means consent is automatically
   * granted, 'required' means explicit user consent is needed.
   */
  consent: 'implicit' | 'required';

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
   * Who owns this application. Platform-owned applications cannot be modified via
   * API.
   */
  owner_type: 'platform' | 'customer';

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
export type ApplicationTrait = 'gateway' | 'mcp-provider' | 'unified-gateway' | 'mcp-server';

/**
 * Entity metadata
 */
export interface Metadata {
  /**
   * Documentation URL
   */
  docs_url?: string;

  /**
   * Icon URL
   */
  icon_url?: string;
}

/**
 * Entity metadata (set to null or {} to remove metadata)
 */
export interface MetadataUpdate {
  /**
   * Documentation URL (set to null to unset)
   */
  docs_url?: string | null;

  /**
   * Icon URL (set to null to unset)
   */
  icon_url?: string | null;
}

export interface ApplicationListResponse {
  items: Array<Application>;

  /**
   * @deprecated Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;

  /**
   * Cursor-based pagination metadata
   */
  pagination: ApplicationListResponse.Pagination;
}

export namespace ApplicationListResponse {
  /**
   * Cursor-based pagination metadata
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
     * Total number of items matching the query. Only included when
     * expand[]=total_count is requested.
     */
    total_count?: number;
  }
}

export interface ApplicationListCredentialsResponse {
  items: Array<ApplicationCredentialsAPI.Credential>;

  /**
   * Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;

  /**
   * Cursor-based pagination metadata
   */
  pagination: ApplicationListCredentialsResponse.Pagination;
}

export namespace ApplicationListCredentialsResponse {
  /**
   * Cursor-based pagination metadata
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
     * Total number of items matching the query. Only included when
     * expand[]=total_count is requested.
     */
    total_count?: number;
  }
}

export interface ApplicationListResourcesResponse {
  items: Array<DependenciesAPI.Resource>;

  /**
   * Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;

  /**
   * Cursor-based pagination metadata
   */
  pagination: ApplicationListResourcesResponse.Pagination;
}

export namespace ApplicationListResourcesResponse {
  /**
   * Cursor-based pagination metadata
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
     * Total number of items matching the query. Only included when
     * expand[]=total_count is requested.
     */
    total_count?: number;
  }
}

export interface ApplicationCreateParams {
  /**
   * User specified identifier, unique within the zone. Must not contain HTML tags
   * (e.g. `<script>`, `<div>`) or control characters.
   */
  identifier: string;

  /**
   * Human-readable name. Must not contain HTML tags (e.g. `<script>`, `<div>`) or
   * control characters.
   */
  name: string;

  /**
   * Consent mode for the application. Defaults to 'required'.
   */
  consent?: 'implicit' | 'required';

  /**
   * Dependencies of the application
   */
  dependencies?: Array<ApplicationCreateParams.Dependency>;

  /**
   * Human-readable description. Must not contain HTML tags (e.g. `<script>`,
   * `<div>`) or control characters.
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
   * Body param: Consent mode for the application. 'implicit' means consent is
   * automatically granted, 'required' means explicit user consent is needed.
   */
  consent?: 'implicit' | 'required';

  /**
   * Body param: Human-readable description. Must not contain HTML tags (e.g.
   * `<script>`, `<div>`) or control characters.
   */
  description?: string | null;

  /**
   * Body param: User specified identifier, unique within the zone. Must not contain
   * HTML tags (e.g. `<script>`, `<div>`) or control characters.
   */
  identifier?: string;

  /**
   * Body param: Entity metadata (set to null or {} to remove metadata)
   */
  metadata?: MetadataUpdate | null;

  /**
   * Body param: Human-readable name. Must not contain HTML tags (e.g. `<script>`,
   * `<div>`) or control characters.
   */
  name?: string;

  /**
   * Body param: Protocol-specific configuration for application update
   */
  protocols?: ApplicationUpdateParams.Protocols | null;
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
  /**
   * Cursor for forward pagination
   */
  after?: string;

  /**
   * Cursor for backward pagination
   */
  before?: string;

  'expand[]'?: 'total_count' | Array<'total_count'>;

  /**
   * Restrict results to applications with this publicId. Repeatable, max 100.
   * Mutually exclusive with after/before.
   */
  'filter[id]'?: string | Array<string>;

  /**
   * Filter by exact application identifier
   */
  'filter[identifier]'?: string | Array<string>;

  /**
   * Filter by exact application slug
   */
  'filter[slug]'?: string | Array<string>;

  identifier?: string;

  /**
   * Maximum number of items to return
   */
  limit?: number;

  /**
   * Search across name and identifier (substring match)
   */
  'query[]'?: string | Array<string>;

  /**
   * Search by identifier (substring match)
   */
  'query[identifier]'?: string | Array<string>;

  /**
   * Search by name (substring match)
   */
  'query[name]'?: string | Array<string>;

  slug?: string;

  /**
   * Comma-separated sort fields. Prefix with - for descending. Allowed: name,
   * identifier
   */
  sort?: string;

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
   * Query param: Cursor for forward pagination
   */
  after?: string;

  /**
   * Query param: Cursor for backward pagination
   */
  before?: string;

  /**
   * Query param
   */
  cursor?: string;

  /**
   * Query param
   */
  'expand[]'?: 'total_count' | Array<'total_count'>;

  /**
   * Query param: Maximum number of items to return
   */
  limit?: number;
}

export interface ApplicationListResourcesParams {
  /**
   * Path param
   */
  zoneId: string;

  /**
   * Query param: Cursor for forward pagination
   */
  after?: string;

  /**
   * Query param: Cursor for backward pagination
   */
  before?: string;

  /**
   * Query param
   */
  cursor?: string;

  /**
   * Query param
   */
  'expand[]'?: 'total_count' | Array<'total_count'>;

  /**
   * Query param: Maximum number of items to return
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
