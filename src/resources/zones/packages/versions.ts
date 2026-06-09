// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PackagesAPI from './packages';

export class Versions extends APIResource {}

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

export declare namespace Versions {
  export { type PackageVersion as PackageVersion, type PackageVersionList as PackageVersionList };
}
