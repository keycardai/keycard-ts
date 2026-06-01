// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PackagesAPI from './packages';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Browse available packages and their versions.
 */
export class Versions extends APIResource {
  /**
   * Get a specific zone package version
   */
  retrieve(
    versionID: string,
    params: VersionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<PackageVersion> {
    const { zone_id, package_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.get(path`/zones/${zone_id}/packages/${package_id}/versions/${versionID}`, {
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
   * List zone package versions
   */
  list(
    packageID: string,
    params: VersionListParams,
    options?: RequestOptions,
  ): APIPromise<PackageVersionList> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID, ...query } = params;
    return this._client.get(path`/zones/${zone_id}/packages/${packageID}/versions`, {
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
}

export interface PackageVersion {
  id: string;

  created_at: string;

  manifest_sha: string;

  name: string;

  owner_type: 'platform' | 'customer';

  version: number;

  archived_at?: string | null;

  created_by?: string;

  description?: string;

  icon_url?: string;

  /**
   * Input binding for a package.
   *
   * `schema` constrains install-level inputs. `bindings` is a CEL expression that
   * assembles the flat input map — static values are CEL literals, install-provided
   * values are `pkg.inputs.X` references. Evaluated at provisioning time to produce
   * the `entities.inputs` map for entity bindings.
   */
  inputs?: PackagesAPI.PackageInputBinding;

  links?: Array<PackageVersion.Link>;

  /**
   * Output binding for a package.
   *
   * `schema` describes the flat outputs surfaced on an install. `bindings` is a CEL
   * expression — a map literal whose keys match `schema.properties` and whose values
   * project fields out of the resolved entity graph. Evaluated after the provisioner
   * has resolved all entities.
   */
  outputs?: PackagesAPI.PackageOutputBinding;

  /**
   * Vocabulary-defined metadata properties, keyed by property URN.
   *
   * Known properties are declared with their schemas; additional properties with
   * custom URNs are permitted via `Record<unknown>`.
   *
   * Each property carries `x-subject-types` indicating which entity types it applies
   * to. Properties with `draft/` in the URN are experimental and carry
   * `x-internal: true`.
   */
  properties?: { [key: string]: unknown };

  tags?: Array<string>;
}

export namespace PackageVersion {
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

export interface PackageVersionList {
  items: Array<PackageVersion>;

  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  pagination: PackageVersionList.Pagination;
}

export namespace PackageVersionList {
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

export interface VersionRetrieveParams {
  /**
   * Path param
   */
  zone_id: string;

  /**
   * Path param
   */
  package_id: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface VersionListParams {
  /**
   * Path param
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
   * Query param: Maximum number of items to return per page.
   */
  limit?: number;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace Versions {
  export {
    type PackageVersion as PackageVersion,
    type PackageVersionList as PackageVersionList,
    type VersionRetrieveParams as VersionRetrieveParams,
    type VersionListParams as VersionListParams,
  };
}
