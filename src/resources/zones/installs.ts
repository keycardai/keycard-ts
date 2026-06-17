// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';

export class Installs extends APIResource {}

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

export declare namespace Installs {
  export { type Install as Install, type InstallList as InstallList, type InstallStatus as InstallStatus };
}
