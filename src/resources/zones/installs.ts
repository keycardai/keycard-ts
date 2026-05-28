// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CatalogTasksAPI from './catalog-tasks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Installs extends APIResource {
  /**
   * Create an install of a package
   */
  create(
    zoneID: string,
    params: InstallCreateParams,
    options?: RequestOptions,
  ): APIPromise<CatalogTasksAPI.Task> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/zones/${zoneID}/installs`, {
      body,
      defaultBaseURL: '/',
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Get a specific zone install
   */
  retrieve(installID: string, params: InstallRetrieveParams, options?: RequestOptions): APIPromise<Install> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.get(path`/zones/${zone_id}/installs/${installID}`, {
      defaultBaseURL: '/',
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * List installs in a zone
   */
  list(
    zoneID: string,
    params: InstallListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InstallList> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/zones/${zoneID}/installs`, {
      query,
      defaultBaseURL: '/',
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Delete a zone install
   */
  delete(
    installID: string,
    params: InstallDeleteParams,
    options?: RequestOptions,
  ): APIPromise<CatalogTasksAPI.Task> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/zones/${zone_id}/installs/${installID}`, {
      defaultBaseURL: '/',
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }
}

export interface Install {
  id: string;

  created_at: string;

  package_id: string;

  package_slug: string;

  status: InstallStatus;

  updated_at: string;

  /**
   * Install-specific input values that supplement the package's inputs. Merged with
   * the package's input values to form the complete `entities.inputs` for entity
   * binding evaluation.
   */
  inputs?: { [key: string]: unknown };

  links?: Array<Install.Link>;

  org_id?: string;

  /**
   * Resolved output values produced by the provisioner, conforming to the package's
   * `Package.outputs.schema`. Flat — the provisioner evaluates
   * `Package.outputs.bindings` against the resolved entity graph.
   */
  outputs?: { [key: string]: unknown };

  package_version?: number;

  zone_id?: string;
}

export namespace Install {
  /**
   * A directed, typed relationship from one entity (the subject) to another (the
   * target).
   *
   * Follows the structure of RFC 7033 JRD link objects, adapted for intra-graph
   * entity references. The subject is the entity whose `links` array contains this
   * link.
   */
  export interface Link {
    /**
     * Target reference.
     *
     * Fragment URIs (`#name`) reference other entities in the same graph by their
     * local name (the key in the entity map). Absolute paths and URLs reference
     * external resources outside the graph.
     */
    href: string;

    /**
     * Link relation type.
     */
    rel: string;

    /**
     * Additional metadata keyed by property name.
     */
    properties?: { [key: string]: unknown };

    /**
     * Human-readable titles keyed by BCP 47 language tag.
     */
    titles?: { [key: string]: string };

    /**
     * Media type of the target resource (per RFC 7033 section 4.4.4.3). Applies to
     * external `href`s; typically omitted for intra-graph references.
     */
    type?: string;
  }
}

export interface InstallList {
  items: Array<Install>;

  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  pagination: InstallList.Pagination;
}

export namespace InstallList {
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

export type InstallStatus = 'pending' | 'active' | 'deleting' | 'failed' | 'deleted';

export interface InstallCreateParams {
  /**
   * Body param: Public ID of the package to install.
   */
  package_id: string;

  /**
   * Body param: Parametric inputs required by the package.
   */
  inputs?: { [key: string]: unknown };

  /**
   * Body param: Specific package version to install. Defaults to latest.
   */
  version?: number;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface InstallRetrieveParams {
  /**
   * Path param
   */
  zone_id: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface InstallListParams {
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
   * Query param: Maximum number of items to return per page.
   */
  limit?: number;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface InstallDeleteParams {
  /**
   * Path param
   */
  zone_id: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace Installs {
  export {
    type Install as Install,
    type InstallList as InstallList,
    type InstallStatus as InstallStatus,
    type InstallCreateParams as InstallCreateParams,
    type InstallRetrieveParams as InstallRetrieveParams,
    type InstallListParams as InstallListParams,
    type InstallDeleteParams as InstallDeleteParams,
  };
}
