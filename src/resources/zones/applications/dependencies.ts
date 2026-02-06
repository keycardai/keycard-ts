// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ProvidersAPI from '../providers';
import * as ZonesAPI from '../zones';
import * as ApplicationsAPI from './applications';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Dependencies extends APIResource {
  /**
   * Retrieves a specific resource dependency of an application
   */
  retrieve(
    dependencyID: string,
    params: DependencyRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<Resource> {
    const { zoneId, id } = params;
    return this._client.get(path`/zones/${zoneId}/applications/${id}/dependencies/${dependencyID}`, options);
  }

  /**
   * Returns resource dependencies for an application
   */
  list(
    id: string,
    params: DependencyListParams,
    options?: RequestOptions,
  ): APIPromise<DependencyListResponse> {
    const { zoneId, ...query } = params;
    return this._client.get(path`/zones/${zoneId}/applications/${id}/dependencies`, { query, ...options });
  }

  /**
   * Adds a resource dependency to an application
   */
  add(dependencyID: string, params: DependencyAddParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId, id, when_accessing } = params;
    return this._client.put(path`/zones/${zoneId}/applications/${id}/dependencies/${dependencyID}`, {
      query: { when_accessing },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Removes a resource dependency from an application
   */
  remove(dependencyID: string, params: DependencyRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId, id } = params;
    return this._client.delete(path`/zones/${zoneId}/applications/${id}/dependencies/${dependencyID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * A Resource is a system that exposes protected information or functionality. It
 * requires authentication of the requesting actor, which may be a user or
 * application, before allowing access.
 */
export interface Resource {
  /**
   * Unique identifier of the resource
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * User specified identifier, unique within the zone
   */
  identifier: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * Organization that owns this resource
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
   * Zone this resource belongs to
   */
  zone_id: string;

  /**
   * @deprecated An Application is a software system with an associated identity that
   * can access Resources. It may act on its own behalf (machine-to-machine) or on
   * behalf of a user (delegated access).
   */
  application?: ApplicationsAPI.Application;

  /**
   * ID of the application that provides this resource
   */
  application_id?: string;

  /**
   * @deprecated A Provider is a system that supplies access to Resources and allows
   * actors (Users or Applications) to authenticate.
   */
  credential_provider?: ProvidersAPI.Provider;

  /**
   * ID of the credential provider for this resource
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
  scopes?: Array<string> | null;

  /**
   * List of resource IDs that, when accessed, make this dependency available. Only
   * present when this resource is returned as a dependency.
   */
  when_accessing?: Array<string>;
}

export interface DependencyListResponse {
  items: Array<Resource>;

  /**
   * Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;
}

export interface DependencyRetrieveParams {
  zoneId: string;

  id: string;
}

export interface DependencyListParams {
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

  /**
   * Query param
   */
  when_accessing?: string;
}

export interface DependencyAddParams {
  /**
   * Path param
   */
  zoneId: string;

  /**
   * Path param
   */
  id: string;

  /**
   * Query param
   */
  when_accessing?: Array<string>;
}

export interface DependencyRemoveParams {
  zoneId: string;

  id: string;
}

export declare namespace Dependencies {
  export {
    type Resource as Resource,
    type DependencyListResponse as DependencyListResponse,
    type DependencyRetrieveParams as DependencyRetrieveParams,
    type DependencyListParams as DependencyListParams,
    type DependencyAddParams as DependencyAddParams,
    type DependencyRemoveParams as DependencyRemoveParams,
  };
}
