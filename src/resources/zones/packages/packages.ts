// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as VersionsAPI from './versions';
import { PackageVersion, PackageVersionList, Versions } from './versions';

export class Packages extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);
}

/**
 * Computed input state for a package — derived at response time from the package
 * kind's schema and the package's input binding. Not stored.
 *
 * `effective_schema` is the full input schema (kind + binding required constraints
 * merged). `effective_bindings` resolves the CEL binding to show actual static
 * values and `{"$input": "path"}` references for install-provided fields.
 */
export interface InputState {
  effective_bindings?: { [key: string]: unknown };

  /**
   * A subset of JSON Schema 2020-12 used to describe package input and output
   * shapes.
   *
   * Supported keywords:
   *
   * - Structural: `type`, `properties`, `required`, `items`, `additionalProperties`
   * - Annotations: `title`, `description`, `default`, `readOnly`, `writeOnly`
   * - Constraints: `pattern`, `minLength`, `maxLength`, `minimum`, `maximum`,
   *   `minItems`, `maxItems`, `enum`, `const`, `format`
   *
   * Intentionally unsupported (reject at release time rather than silently ignore):
   *
   * - Schema combinators: `allOf`, `anyOf`, `oneOf`, `not`
   * - References: `$ref`, `$dynamicRef`
   * - `patternProperties`, `propertyNames`, `unevaluatedProperties`
   * - Custom vocabularies and `$vocabulary`
   *
   * Dialect: JSON Schema 2020-12 (implied — authors do not include `$schema`).
   */
  effective_schema?: InputState.EffectiveSchema;
}

export namespace InputState {
  /**
   * A subset of JSON Schema 2020-12 used to describe package input and output
   * shapes.
   *
   * Supported keywords:
   *
   * - Structural: `type`, `properties`, `required`, `items`, `additionalProperties`
   * - Annotations: `title`, `description`, `default`, `readOnly`, `writeOnly`
   * - Constraints: `pattern`, `minLength`, `maxLength`, `minimum`, `maximum`,
   *   `minItems`, `maxItems`, `enum`, `const`, `format`
   *
   * Intentionally unsupported (reject at release time rather than silently ignore):
   *
   * - Schema combinators: `allOf`, `anyOf`, `oneOf`, `not`
   * - References: `$ref`, `$dynamicRef`
   * - `patternProperties`, `propertyNames`, `unevaluatedProperties`
   * - Custom vocabularies and `$vocabulary`
   *
   * Dialect: JSON Schema 2020-12 (implied — authors do not include `$schema`).
   */
  export interface EffectiveSchema {
    /**
     * Schema for properties not named in `properties`.
     */
    additionalProperties?: unknown;

    /**
     * Constant allowed value.
     */
    const?: unknown;

    /**
     * Default value (annotation).
     */
    default?: unknown;

    /**
     * Human-readable description (annotation).
     */
    description?: string;

    /**
     * Enumerated allowed values.
     */
    enum?: Array<unknown>;

    /**
     * Format hint (e.g., "uri", "uuid", "email", "date-time").
     */
    format?: string;

    /**
     * Schema for array items.
     */
    items?: unknown;

    maximum?: number;

    maxItems?: number;

    maxLength?: number;

    minimum?: number;

    minItems?: number;

    minLength?: number;

    pattern?: string;

    /**
     * Property schemas, keyed by property name.
     */
    properties?: unknown;

    /**
     * Read-only hint — server-populated, ignored on write.
     */
    readOnly?: boolean;

    /**
     * Names of required properties.
     */
    required?: Array<string>;

    /**
     * Human-readable title (annotation).
     */
    title?: string;

    /**
     * The `type` keyword in JSON Schema 2020-12.
     */
    type?: 'object' | 'array' | 'string' | 'integer' | 'number' | 'boolean' | 'null';

    /**
     * Write-only hint (passwords, secrets) — never returned on read.
     */
    writeOnly?: boolean;
  }
}

export interface Package {
  id: string;

  created_at: string;

  kind: string;

  name: string;

  /**
   * Server-populated URL-friendly identifier.
   */
  slug: string;

  updated_at: string;

  current_version?: VersionsAPI.PackageVersion;

  description?: string;

  draft?: PackageDraft;

  icon_url?: string;

  /**
   * Computed input state for a package — derived at response time from the package
   * kind's schema and the package's input binding. Not stored.
   *
   * `effective_schema` is the full input schema (kind + binding required constraints
   * merged). `effective_bindings` resolves the CEL binding to show actual static
   * values and `{"$input": "path"}` references for install-provided fields.
   */
  input_state?: InputState;

  /**
   * Input binding for a package.
   *
   * `schema` constrains install-level inputs. `bindings` is a CEL expression that
   * assembles the flat input map — static values are CEL literals, install-provided
   * values are `pkg.inputs.X` references. Evaluated at provisioning time to produce
   * the `entities.inputs` map for entity bindings.
   */
  inputs?: PackageInputBinding;

  links?: Array<Package.Link>;

  /**
   * Output binding for a package.
   *
   * `schema` describes the flat outputs surfaced on an install. `bindings` is a CEL
   * expression — a map literal whose keys match `schema.properties` and whose values
   * project fields out of the resolved entity graph. Evaluated after the provisioner
   * has resolved all entities.
   */
  outputs?: PackageOutputBinding;

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

  /**
   * Provenance info for a package originating from an ancestor catalog.
   */
  source?: PackageSource;

  tags?: Array<string>;
}

export namespace Package {
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

export interface PackageDraft {
  id: string;

  manifest_sha: string;

  name: string;

  updated_at: string;

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
  inputs?: PackageInputBinding;

  links?: Array<PackageDraft.Link>;

  /**
   * Output binding for a package.
   *
   * `schema` describes the flat outputs surfaced on an install. `bindings` is a CEL
   * expression — a map literal whose keys match `schema.properties` and whose values
   * project fields out of the resolved entity graph. Evaluated after the provisioner
   * has resolved all entities.
   */
  outputs?: PackageOutputBinding;

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

export namespace PackageDraft {
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

/**
 * Input binding for a package.
 *
 * `schema` constrains install-level inputs. `bindings` is a CEL expression that
 * assembles the flat input map — static values are CEL literals, install-provided
 * values are `pkg.inputs.X` references. Evaluated at provisioning time to produce
 * the `entities.inputs` map for entity bindings.
 */
export interface PackageInputBinding {
  /**
   * CEL expression assembling the flat input map from static values and
   * install-provided values (referenced via `pkg.inputs.X`).
   *
   * Scope:
   *
   * - `pkg.inputs` — install-supplied values conforming to `schema`.
   */
  bindings?: string;

  /**
   * A subset of JSON Schema 2020-12 used to describe package input and output
   * shapes.
   *
   * Supported keywords:
   *
   * - Structural: `type`, `properties`, `required`, `items`, `additionalProperties`
   * - Annotations: `title`, `description`, `default`, `readOnly`, `writeOnly`
   * - Constraints: `pattern`, `minLength`, `maxLength`, `minimum`, `maximum`,
   *   `minItems`, `maxItems`, `enum`, `const`, `format`
   *
   * Intentionally unsupported (reject at release time rather than silently ignore):
   *
   * - Schema combinators: `allOf`, `anyOf`, `oneOf`, `not`
   * - References: `$ref`, `$dynamicRef`
   * - `patternProperties`, `propertyNames`, `unevaluatedProperties`
   * - Custom vocabularies and `$vocabulary`
   *
   * Dialect: JSON Schema 2020-12 (implied — authors do not include `$schema`).
   */
  schema?: PackageInputBinding.Schema;
}

export namespace PackageInputBinding {
  /**
   * A subset of JSON Schema 2020-12 used to describe package input and output
   * shapes.
   *
   * Supported keywords:
   *
   * - Structural: `type`, `properties`, `required`, `items`, `additionalProperties`
   * - Annotations: `title`, `description`, `default`, `readOnly`, `writeOnly`
   * - Constraints: `pattern`, `minLength`, `maxLength`, `minimum`, `maximum`,
   *   `minItems`, `maxItems`, `enum`, `const`, `format`
   *
   * Intentionally unsupported (reject at release time rather than silently ignore):
   *
   * - Schema combinators: `allOf`, `anyOf`, `oneOf`, `not`
   * - References: `$ref`, `$dynamicRef`
   * - `patternProperties`, `propertyNames`, `unevaluatedProperties`
   * - Custom vocabularies and `$vocabulary`
   *
   * Dialect: JSON Schema 2020-12 (implied — authors do not include `$schema`).
   */
  export interface Schema {
    /**
     * Schema for properties not named in `properties`.
     */
    additionalProperties?: unknown;

    /**
     * Constant allowed value.
     */
    const?: unknown;

    /**
     * Default value (annotation).
     */
    default?: unknown;

    /**
     * Human-readable description (annotation).
     */
    description?: string;

    /**
     * Enumerated allowed values.
     */
    enum?: Array<unknown>;

    /**
     * Format hint (e.g., "uri", "uuid", "email", "date-time").
     */
    format?: string;

    /**
     * Schema for array items.
     */
    items?: unknown;

    maximum?: number;

    maxItems?: number;

    maxLength?: number;

    minimum?: number;

    minItems?: number;

    minLength?: number;

    pattern?: string;

    /**
     * Property schemas, keyed by property name.
     */
    properties?: unknown;

    /**
     * Read-only hint — server-populated, ignored on write.
     */
    readOnly?: boolean;

    /**
     * Names of required properties.
     */
    required?: Array<string>;

    /**
     * Human-readable title (annotation).
     */
    title?: string;

    /**
     * The `type` keyword in JSON Schema 2020-12.
     */
    type?: 'object' | 'array' | 'string' | 'integer' | 'number' | 'boolean' | 'null';

    /**
     * Write-only hint (passwords, secrets) — never returned on read.
     */
    writeOnly?: boolean;
  }
}

export interface PackageList {
  items: Array<Package>;

  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  pagination: PackageList.Pagination;
}

export namespace PackageList {
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

/**
 * Output binding for a package.
 *
 * `schema` describes the flat outputs surfaced on an install. `bindings` is a CEL
 * expression — a map literal whose keys match `schema.properties` and whose values
 * project fields out of the resolved entity graph. Evaluated after the provisioner
 * has resolved all entities.
 */
export interface PackageOutputBinding {
  /**
   * CEL expression source. Must evaluate to a map whose fields match
   * `schema.properties`.
   *
   * Scope: `entities`:
   *
   * - `entities.inputs` — the package's input values (merged with install inputs at
   *   provisioning time).
   * - `entities.<name>` — resolved entities in the graph, each with `href: string`
   *   and `outputs: map<string, dyn>`.
   */
  bindings: string;

  /**
   * A subset of JSON Schema 2020-12 used to describe package input and output
   * shapes.
   *
   * Supported keywords:
   *
   * - Structural: `type`, `properties`, `required`, `items`, `additionalProperties`
   * - Annotations: `title`, `description`, `default`, `readOnly`, `writeOnly`
   * - Constraints: `pattern`, `minLength`, `maxLength`, `minimum`, `maximum`,
   *   `minItems`, `maxItems`, `enum`, `const`, `format`
   *
   * Intentionally unsupported (reject at release time rather than silently ignore):
   *
   * - Schema combinators: `allOf`, `anyOf`, `oneOf`, `not`
   * - References: `$ref`, `$dynamicRef`
   * - `patternProperties`, `propertyNames`, `unevaluatedProperties`
   * - Custom vocabularies and `$vocabulary`
   *
   * Dialect: JSON Schema 2020-12 (implied — authors do not include `$schema`).
   */
  schema: PackageOutputBinding.Schema;
}

export namespace PackageOutputBinding {
  /**
   * A subset of JSON Schema 2020-12 used to describe package input and output
   * shapes.
   *
   * Supported keywords:
   *
   * - Structural: `type`, `properties`, `required`, `items`, `additionalProperties`
   * - Annotations: `title`, `description`, `default`, `readOnly`, `writeOnly`
   * - Constraints: `pattern`, `minLength`, `maxLength`, `minimum`, `maximum`,
   *   `minItems`, `maxItems`, `enum`, `const`, `format`
   *
   * Intentionally unsupported (reject at release time rather than silently ignore):
   *
   * - Schema combinators: `allOf`, `anyOf`, `oneOf`, `not`
   * - References: `$ref`, `$dynamicRef`
   * - `patternProperties`, `propertyNames`, `unevaluatedProperties`
   * - Custom vocabularies and `$vocabulary`
   *
   * Dialect: JSON Schema 2020-12 (implied — authors do not include `$schema`).
   */
  export interface Schema {
    /**
     * Schema for properties not named in `properties`.
     */
    additionalProperties?: unknown;

    /**
     * Constant allowed value.
     */
    const?: unknown;

    /**
     * Default value (annotation).
     */
    default?: unknown;

    /**
     * Human-readable description (annotation).
     */
    description?: string;

    /**
     * Enumerated allowed values.
     */
    enum?: Array<unknown>;

    /**
     * Format hint (e.g., "uri", "uuid", "email", "date-time").
     */
    format?: string;

    /**
     * Schema for array items.
     */
    items?: unknown;

    maximum?: number;

    maxItems?: number;

    maxLength?: number;

    minimum?: number;

    minItems?: number;

    minLength?: number;

    pattern?: string;

    /**
     * Property schemas, keyed by property name.
     */
    properties?: unknown;

    /**
     * Read-only hint — server-populated, ignored on write.
     */
    readOnly?: boolean;

    /**
     * Names of required properties.
     */
    required?: Array<string>;

    /**
     * Human-readable title (annotation).
     */
    title?: string;

    /**
     * The `type` keyword in JSON Schema 2020-12.
     */
    type?: 'object' | 'array' | 'string' | 'integer' | 'number' | 'boolean' | 'null';

    /**
     * Write-only hint (passwords, secrets) — never returned on read.
     */
    writeOnly?: boolean;
  }
}

/**
 * Provenance info for a package originating from an ancestor catalog.
 */
export interface PackageSource {
  /**
   * Scope type of the catalog where the package is authored.
   */
  scope: 'global' | 'org' | 'zone';
}

Packages.Versions = Versions;

export declare namespace Packages {
  export {
    type InputState as InputState,
    type Package as Package,
    type PackageDraft as PackageDraft,
    type PackageInputBinding as PackageInputBinding,
    type PackageList as PackageList,
    type PackageOutputBinding as PackageOutputBinding,
    type PackageSource as PackageSource,
  };

  export {
    Versions as Versions,
    type PackageVersion as PackageVersion,
    type PackageVersionList as PackageVersionList,
  };
}
