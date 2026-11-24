// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PolicySetsAPI from './policy-sets/policy-sets';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Stateless policy evaluation testing
 */
export class PolicyEvaluations extends APIResource {
  /**
   * Stateless evaluation endpoint for testing Cedar policy evaluation against real
   * entities before deployment. Supports evaluating a single policy, a full policy
   * set, or raw Cedar text.
   */
  create(
    zoneID: string,
    params: PolicyEvaluationCreateParams,
    options?: RequestOptions,
  ): APIPromise<PolicyEvaluationCreateResponse> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/zones/${zoneID}/policy-evaluations`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(xAPIVersion != null ? { 'X-API-Version': xAPIVersion } : undefined),
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Returns a paginated list of evaluation request entries captured from live
   * credentials API traffic for the specified zone. Sorted by created_at descending
   * (newest first). Use with the test evaluation endpoint for replay-based impact
   * analysis.
   */
  listRequests(
    zoneID: string,
    params: PolicyEvaluationListRequestsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PolicyEvaluationListRequestsResponse> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/zones/${zoneID}/policy-evaluations/requests`, {
      query,
      ...options,
      headers: buildHeaders([
        {
          ...(xAPIVersion != null ? { 'X-API-Version': xAPIVersion } : undefined),
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export interface PolicyEvaluationCreateResponse {
  decision: 'allow' | 'deny';

  evaluated_at: string;

  /**
   * Per-sub-check results, each with the policies that determined it. A simple
   * request has one actor check; an on-behalf-of / impersonation request has a
   * subject check and an actor check. The overall decision is deny-wins across
   * these. Determining-policy names and policy-set version populate only when
   * evaluating a minted policy set/version; raw text and drafts are structural.
   */
  checks?: Array<PolicyEvaluationCreateResponse.Check>;

  /**
   * Raw Cedar policy IDs that determined the decision, of the form
   * "<policy_version_id>::<cedar_key>", unioned across sub-checks. See `checks` for
   * the resolved, human-readable form with per-check attribution.
   */
  determining_policies?: Array<string>;

  diagnostics?: Array<PolicyEvaluationCreateResponse.Diagnostic>;

  entity_snapshot?: PolicyEvaluationCreateResponse.EntitySnapshot;

  evaluation_status?: 'complete' | 'partial';

  /**
   * Human-readable explanation of the decision, suitable for presenting to end
   * users.
   */
  reason?: string;
}

export namespace PolicyEvaluationCreateResponse {
  /**
   * Result of a single Cedar sub-check within a compound evaluation. Each check's
   * determining policies and their effect are attributed to that check's own
   * decision, not the deny-wins aggregate.
   */
  export interface Check {
    decision?: 'allow' | 'deny';

    determining_policies?: Array<Check.DeterminingPolicy>;

    /**
     * actor = the requesting principal's access (or its right to act for the subject
     * in an on-behalf-of flow); subject = the impersonated / delegated principal's own
     * access.
     */
    role?: 'actor' | 'subject';
  }

  export namespace Check {
    /**
     * A policy that contributed to the decision, enriched with human-readable names
     * and version. For an allow these are permit policies; for an explicit deny these
     * are forbid policies. An implicit (fall-through) deny has none. On the management
     * test-evaluate endpoint, names and policy-set version populate only when a minted
     * policy version is being evaluated; raw text and draft sources stay structural.
     */
    export interface DeterminingPolicy {
      effect?: 'permit' | 'forbid';

      /**
       * Public ID of the policy.
       */
      policy_id?: string;

      /**
       * Human-readable policy name.
       */
      policy_name?: string;

      /**
       * Public ID of the policy set the policy belongs to.
       */
      policy_set_id?: string;

      /**
       * Human-readable policy set name.
       */
      policy_set_name?: string;

      /**
       * Version number of the policy set.
       */
      policy_set_version?: number;

      /**
       * Public ID of the policy version that was evaluated.
       */
      policy_version_id?: string;

      /**
       * Cedar per-rule `@id` annotation that determined the decision (e.g.
       * `limit-linear-scopes`). Falls back to the generated `policyN` key when the Cedar
       * statement carries no `@id`.
       */
      rule_id?: string;
    }
  }

  export interface Diagnostic {
    message?: string;

    policy_id?: string;
  }

  export interface EntitySnapshot {
    /**
     * The assembled Cedar context record.
     */
    context?: unknown;

    /**
     * Subset of the IAM User entity relevant to Cedar evaluation. All fields match the
     * IAM management API User schema.
     */
    principal?: EntitySnapshot.PdpUserSnapshot | EntitySnapshot.PdpApplicationSnapshot;

    /**
     * Subset of the IAM Resource entity relevant to Cedar evaluation. All fields match
     * the IAM management API Resource schema.
     */
    resource?: EntitySnapshot.Resource;

    /**
     * Present when subject_type/subject_id were provided.
     */
    subject?: EntitySnapshot.PdpUserSnapshot | EntitySnapshot.PdpApplicationSnapshot;
  }

  export namespace EntitySnapshot {
    /**
     * Subset of the IAM User entity relevant to Cedar evaluation. All fields match the
     * IAM management API User schema.
     */
    export interface PdpUserSnapshot {
      /**
       * User public ID (same as IAM management API).
       */
      id: string;

      email: string;

      type: 'user';

      email_verified?: boolean;
    }

    /**
     * Subset of the IAM Application entity relevant to Cedar evaluation. All fields
     * match the IAM management API Application schema.
     */
    export interface PdpApplicationSnapshot {
      /**
       * Application public ID (same as IAM management API).
       */
      id: string;

      name: string;

      registration_method: 'managed' | 'dcr';

      type: 'application';

      /**
       * Present only when resolved via credential lookup.
       */
      credential_type?: string;

      /**
       * Resources this application depends on.
       */
      dependencies?: Array<PdpApplicationSnapshot.Dependency>;
    }

    export namespace PdpApplicationSnapshot {
      /**
       * Subset of the IAM Resource entity relevant to Cedar evaluation. All fields match
       * the IAM management API Resource schema.
       */
      export interface Dependency {
        /**
         * Resource public ID (same as IAM management API).
         */
        id: string;

        identifier: string;

        name: string;

        scopes?: Array<string>;
      }
    }

    /**
     * Subset of the IAM Resource entity relevant to Cedar evaluation. All fields match
     * the IAM management API Resource schema.
     */
    export interface Resource {
      /**
       * Resource public ID (same as IAM management API).
       */
      id: string;

      identifier: string;

      name: string;

      scopes?: Array<string>;
    }

    /**
     * Subset of the IAM User entity relevant to Cedar evaluation. All fields match the
     * IAM management API User schema.
     */
    export interface PdpUserSnapshot {
      /**
       * User public ID (same as IAM management API).
       */
      id: string;

      email: string;

      type: 'user';

      email_verified?: boolean;
    }

    /**
     * Subset of the IAM Application entity relevant to Cedar evaluation. All fields
     * match the IAM management API Application schema.
     */
    export interface PdpApplicationSnapshot {
      /**
       * Application public ID (same as IAM management API).
       */
      id: string;

      name: string;

      registration_method: 'managed' | 'dcr';

      type: 'application';

      /**
       * Present only when resolved via credential lookup.
       */
      credential_type?: string;

      /**
       * Resources this application depends on.
       */
      dependencies?: Array<PdpApplicationSnapshot.Dependency>;
    }

    export namespace PdpApplicationSnapshot {
      /**
       * Subset of the IAM Resource entity relevant to Cedar evaluation. All fields match
       * the IAM management API Resource schema.
       */
      export interface Dependency {
        /**
         * Resource public ID (same as IAM management API).
         */
        id: string;

        identifier: string;

        name: string;

        scopes?: Array<string>;
      }
    }
  }
}

export interface PolicyEvaluationListRequestsResponse {
  items: Array<PolicyEvaluationListRequestsResponse.Item>;

  /**
   * Cursor-based pagination metadata returned alongside a list of results
   */
  pagination: PolicyEvaluationListRequestsResponse.Pagination;
}

export namespace PolicyEvaluationListRequestsResponse {
  export interface Item {
    /**
     * Unique identifier for this evaluation request entry.
     */
    id: string;

    action: string;

    active_decision: 'allow' | 'deny';

    /**
     * Evaluation duration in milliseconds.
     */
    active_duration_ms: number;

    /**
     * ID of the active policy set version used for evaluation.
     */
    active_psv_id: string;

    /**
     * Cedar schema version of the active policy set version.
     */
    active_schema_version: string;

    created_at: string;

    principal_id: string;

    principal_type: 'user' | 'application';

    /**
     * Correlation ID from the original credentials API request.
     */
    request_id: string;

    resource_id: string;

    /**
     * The verified RFC 8693 acting principal (nominated via actor_token) from the
     * original check, when one was present.
     */
    acting_principal_id?: string | null;

    authority_type?: 'delegation' | 'impersonation' | null;

    /**
     * Additional context for Cedar authorization evaluation. Fields here are mapped
     * directly into the Cedar `context` record.
     */
    context?: Item.Context;

    /**
     * ID of the shadow policy set version, if a shadow binding existed.
     */
    shadow_psv_id?: string | null;

    subject_id?: string | null;

    subject_type?: 'user' | 'application' | null;
  }

  export namespace Item {
    /**
     * Additional context for Cedar authorization evaluation. Fields here are mapped
     * directly into the Cedar `context` record.
     */
    export interface Context {
      /**
       * Token claims for the actor, subject, and/or acting principal. Mapped to
       * `context.actor_claims`, `context.subject_claims`, and
       * `context.acting_principal_claims` in Cedar.
       */
      claims?: Context.Claims;

      /**
       * OAuth scopes associated with the request. Mapped to `context.scopes` in the
       * Cedar evaluation as a `Set<String>`.
       */
      scopes?: Array<string>;

      /**
       * Session identifier for the current authorization context. Mapped to
       * `context.session_id` in Cedar.
       */
      session_id?: string;
    }

    export namespace Context {
      /**
       * Token claims for the actor, subject, and/or acting principal. Mapped to
       * `context.actor_claims`, `context.subject_claims`, and
       * `context.acting_principal_claims` in Cedar.
       */
      export interface Claims {
        /**
         * Represents token claims passed into the Cedar context. Mapped to the Cedar
         * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
         * typed; additional claims are passed through as untyped key-value pairs via
         * `additionalProperties`.
         */
        acting_principal?: Claims.ActingPrincipal;

        /**
         * Represents token claims passed into the Cedar context. Mapped to the Cedar
         * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
         * typed; additional claims are passed through as untyped key-value pairs via
         * `additionalProperties`.
         */
        actor?: Claims.Actor;

        /**
         * Represents token claims passed into the Cedar context. Mapped to the Cedar
         * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
         * typed; additional claims are passed through as untyped key-value pairs via
         * `additionalProperties`.
         */
        subject?: Claims.Subject;
      }

      export namespace Claims {
        /**
         * Represents token claims passed into the Cedar context. Mapped to the Cedar
         * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
         * typed; additional claims are passed through as untyped key-value pairs via
         * `additionalProperties`.
         */
        export interface ActingPrincipal {
          /**
           * Email claim from the authentication token.
           */
          email?: string;

          /**
           * Group membership claims from the authentication token.
           */
          groups?: Array<string>;

          /**
           * Issuer-specific claims forwarded opaquely from STS (e.g. GHA OIDC assertion
           * claims). Mapped to `context.actor_claims.issuer_claims` in Cedar. All fields are
           * optional and issuer-dependent. See issuer documentation for available claim
           * fields.
           */
          issuer_claims?: { [key: string]: unknown };

          [k: string]: unknown;
        }

        /**
         * Represents token claims passed into the Cedar context. Mapped to the Cedar
         * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
         * typed; additional claims are passed through as untyped key-value pairs via
         * `additionalProperties`.
         */
        export interface Actor {
          /**
           * Email claim from the authentication token.
           */
          email?: string;

          /**
           * Group membership claims from the authentication token.
           */
          groups?: Array<string>;

          /**
           * Issuer-specific claims forwarded opaquely from STS (e.g. GHA OIDC assertion
           * claims). Mapped to `context.actor_claims.issuer_claims` in Cedar. All fields are
           * optional and issuer-dependent. See issuer documentation for available claim
           * fields.
           */
          issuer_claims?: { [key: string]: unknown };

          [k: string]: unknown;
        }

        /**
         * Represents token claims passed into the Cedar context. Mapped to the Cedar
         * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
         * typed; additional claims are passed through as untyped key-value pairs via
         * `additionalProperties`.
         */
        export interface Subject {
          /**
           * Email claim from the authentication token.
           */
          email?: string;

          /**
           * Group membership claims from the authentication token.
           */
          groups?: Array<string>;

          /**
           * Issuer-specific claims forwarded opaquely from STS (e.g. GHA OIDC assertion
           * claims). Mapped to `context.actor_claims.issuer_claims` in Cedar. All fields are
           * optional and issuer-dependent. See issuer documentation for available claim
           * fields.
           */
          issuer_claims?: { [key: string]: unknown };

          [k: string]: unknown;
        }
      }
    }
  }

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

export interface PolicyEvaluationCreateParams {
  /**
   * Body param: Cedar action to evaluate (e.g. `any`). The engine namespaces actions
   * automatically as `Keycard::Action::"<name>"`.
   */
  action: string;

  /**
   * Body param: Specifies which policies to evaluate. Exactly one of policy,
   * policy_set, raw, or manifest must be provided.
   */
  policy_source: PolicyEvaluationCreateParams.PolicySource;

  /**
   * Body param: Public ID of the user or application.
   */
  principal_id: string;

  /**
   * Body param
   */
  principal_type: 'user' | 'application';

  /**
   * Body param: Public ID of the resource.
   */
  resource_id: string;

  /**
   * Body param: ID of the acting application from a verified RFC 8693 `actor_token`,
   * as sent on `/policy/check`. Resolved with the same entity lookup as an
   * application `principal_id` and exposed to Cedar as
   * `context.acting_principal.application` on both checks. Lets a captured
   * evaluation request be replayed faithfully.
   */
  acting_principal_id?: string;

  /**
   * Body param: Discriminator for the subject authority model. Determines how the
   * subject relationship is expressed in the Cedar context:
   *
   * - `"delegation"` — sets `context.on_behalf = true` on the actor check. The actor
   *   is acting on behalf of the subject.
   * - `"impersonation"` — sets `context.impersonate = true` on the actor check. The
   *   actor is impersonating the subject. When null and a subject is present,
   *   defaults to `"delegation"` for backward compatibility.
   */
  authority_type?: 'delegation' | 'impersonation' | null;

  /**
   * Body param: Additional context for Cedar authorization evaluation. Fields here
   * are mapped directly into the Cedar `context` record.
   */
  context?: PolicyEvaluationCreateParams.Context;

  /**
   * Body param: Public ID of the subject (required when subject_type is set).
   */
  subject_id?: string;

  /**
   * Body param
   */
  subject_type?: 'user' | 'application';

  /**
   * Header param: API version header (date-based, e.g. 2026-02-01)
   */
  'X-API-Version'?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export namespace PolicyEvaluationCreateParams {
  /**
   * Specifies which policies to evaluate. Exactly one of policy, policy_set, raw, or
   * manifest must be provided.
   */
  export interface PolicySource {
    /**
     * Inline policy-set manifest used by the `manifest` variant of PolicySource.
     * Mirrors the shape of a stored policy set version's manifest so a policy set
     * under construction (no stored id/version) can be tested without being saved
     * first. The `sha` field on each entry is ignored on input and recomputed
     * server-side.
     */
    manifest?: PolicySource.Manifest;

    policy?: PolicySource.Policy;

    policy_set?: PolicySource.PolicySet;

    raw?: PolicySource.Raw;
  }

  export namespace PolicySource {
    /**
     * Inline policy-set manifest used by the `manifest` variant of PolicySource.
     * Mirrors the shape of a stored policy set version's manifest so a policy set
     * under construction (no stored id/version) can be tested without being saved
     * first. The `sha` field on each entry is ignored on input and recomputed
     * server-side.
     */
    export interface Manifest {
      entries: Array<PolicySetsAPI.PolicySetManifestEntry>;

      /**
       * Cedar schema version the entries are validated against.
       */
      schema_version: string;
    }

    export interface Policy {
      /**
       * Public ID of the policy.
       */
      policy_id: string;

      /**
       * Cedar schema version override (date string, e.g. "2026-03-16"). When omitted,
       * uses the schema_version recorded on the resolved policy version or draft.
       */
      schema_version?: string;

      /**
       * Public ID of a specific policy version. When omitted, the draft is used. If no
       * draft exists, returns 400.
       */
      version_id?: string;
    }

    export interface PolicySet {
      /**
       * Public ID of the policy set.
       */
      policy_set_id: string;

      /**
       * Public ID of a specific policy set version. When omitted, the draft is used. If
       * no draft exists, returns 400.
       */
      version_id?: string;
    }

    export interface Raw {
      /**
       * Raw Cedar policy text. Can contain one or more policy statements. Converted to
       * JSON before evaluation.
       */
      cedar: string;

      /**
       * Cedar schema version to evaluate against.
       */
      schema_version: string;

      /**
       * When true, validate the converted policy against the schema before evaluation.
       * Validation errors are returned as 400 with details. Set to false to skip
       * validation and attempt evaluation directly.
       */
      validate?: boolean;
    }
  }

  /**
   * Additional context for Cedar authorization evaluation. Fields here are mapped
   * directly into the Cedar `context` record.
   */
  export interface Context {
    /**
     * Token claims for the actor, subject, and/or acting principal. Mapped to
     * `context.actor_claims`, `context.subject_claims`, and
     * `context.acting_principal_claims` in Cedar.
     */
    claims?: Context.Claims;

    /**
     * OAuth scopes associated with the request. Mapped to `context.scopes` in the
     * Cedar evaluation as a `Set<String>`.
     */
    scopes?: Array<string>;

    /**
     * Session identifier for the current authorization context. Mapped to
     * `context.session_id` in Cedar.
     */
    session_id?: string;
  }

  export namespace Context {
    /**
     * Token claims for the actor, subject, and/or acting principal. Mapped to
     * `context.actor_claims`, `context.subject_claims`, and
     * `context.acting_principal_claims` in Cedar.
     */
    export interface Claims {
      /**
       * Represents token claims passed into the Cedar context. Mapped to the Cedar
       * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
       * typed; additional claims are passed through as untyped key-value pairs via
       * `additionalProperties`.
       */
      acting_principal?: Claims.ActingPrincipal;

      /**
       * Represents token claims passed into the Cedar context. Mapped to the Cedar
       * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
       * typed; additional claims are passed through as untyped key-value pairs via
       * `additionalProperties`.
       */
      actor?: Claims.Actor;

      /**
       * Represents token claims passed into the Cedar context. Mapped to the Cedar
       * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
       * typed; additional claims are passed through as untyped key-value pairs via
       * `additionalProperties`.
       */
      subject?: Claims.Subject;
    }

    export namespace Claims {
      /**
       * Represents token claims passed into the Cedar context. Mapped to the Cedar
       * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
       * typed; additional claims are passed through as untyped key-value pairs via
       * `additionalProperties`.
       */
      export interface ActingPrincipal {
        /**
         * Email claim from the authentication token.
         */
        email?: string;

        /**
         * Group membership claims from the authentication token.
         */
        groups?: Array<string>;

        /**
         * Issuer-specific claims forwarded opaquely from STS (e.g. GHA OIDC assertion
         * claims). Mapped to `context.actor_claims.issuer_claims` in Cedar. All fields are
         * optional and issuer-dependent. See issuer documentation for available claim
         * fields.
         */
        issuer_claims?: { [key: string]: unknown };

        [k: string]: unknown;
      }

      /**
       * Represents token claims passed into the Cedar context. Mapped to the Cedar
       * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
       * typed; additional claims are passed through as untyped key-value pairs via
       * `additionalProperties`.
       */
      export interface Actor {
        /**
         * Email claim from the authentication token.
         */
        email?: string;

        /**
         * Group membership claims from the authentication token.
         */
        groups?: Array<string>;

        /**
         * Issuer-specific claims forwarded opaquely from STS (e.g. GHA OIDC assertion
         * claims). Mapped to `context.actor_claims.issuer_claims` in Cedar. All fields are
         * optional and issuer-dependent. See issuer documentation for available claim
         * fields.
         */
        issuer_claims?: { [key: string]: unknown };

        [k: string]: unknown;
      }

      /**
       * Represents token claims passed into the Cedar context. Mapped to the Cedar
       * `Keycard::Claims` type. Known fields (`email`, `groups`, `issuer_claims`) are
       * typed; additional claims are passed through as untyped key-value pairs via
       * `additionalProperties`.
       */
      export interface Subject {
        /**
         * Email claim from the authentication token.
         */
        email?: string;

        /**
         * Group membership claims from the authentication token.
         */
        groups?: Array<string>;

        /**
         * Issuer-specific claims forwarded opaquely from STS (e.g. GHA OIDC assertion
         * claims). Mapped to `context.actor_claims.issuer_claims` in Cedar. All fields are
         * optional and issuer-dependent. See issuer documentation for available claim
         * fields.
         */
        issuer_claims?: { [key: string]: unknown };

        [k: string]: unknown;
      }
    }
  }
}

export interface PolicyEvaluationListRequestsParams {
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
   * Query param: Opt-in to additional response fields (`total_count`, `user`).
   * Repeatable; matches the `expand[]` convention used across the Keycard API.
   */
  'expand[]'?: 'total_count' | 'user' | Array<'total_count' | 'user'>;

  /**
   * Query param: Filter on `active_decision`. Repeatable; repeated instances OR
   * across values. See `FilterValues` in the shared spec for the full wire
   * convention.
   *
   * Allowed values: `allow`, `deny`. Unknown values return 400 with the list of
   * allowed values. Comma-separated single values are rejected with a 400 pointing
   * at the repeated-parameter OR form.
   *
   * Note: the allowed-value enum is enforced in the handler (not as an OpenAPI
   * `items.enum`) so the server can return a targeted error for the comma-AND form
   * instead of a generic "not in allowed values" response.
   */
  'filter[active_decision]'?: Array<string>;

  /**
   * Query param: Filter on `authority_type`. Repeatable; repeated instances OR
   * across values. See `FilterValues` in the shared spec for the full wire
   * convention. Rows with `NULL` authority_type are excluded when this filter is
   * present.
   *
   * Allowed values: `delegation`, `impersonation`. Unknown values return 400 with
   * the list of allowed values. Comma-separated single values are rejected with a
   * 400 pointing at the repeated-parameter OR form.
   *
   * Note: the allowed-value enum is enforced in the handler.
   */
  'filter[authority_type]'?: Array<string>;

  /**
   * Query param: Filter by shadow-evaluation presence. When `true`, returns only
   * requests that had a shadow policy set version (`shadow_psv_id IS NOT NULL`).
   * When `false`, returns only requests without one. Omit to return all.
   */
  'filter[has_shadow]'?: boolean;

  /**
   * Query param: Filter on `principal_id` by exact match. Repeatable; repeated
   * instances OR across values. See `FilterValues` in the shared spec for the full
   * wire convention. Comma-separated single values are rejected with a 400 pointing
   * at the repeated-parameter OR form.
   */
  'filter[principal_id]'?: Array<string>;

  /**
   * Query param: Filter on `principal_type`. Repeatable; repeated instances OR
   * across values. See `FilterValues` in the shared spec for the full wire
   * convention.
   *
   * Allowed values: `user`, `application`. Unknown values return 400 with the list
   * of allowed values. Comma-separated single values are rejected with a 400
   * pointing at the repeated-parameter OR form.
   *
   * Note: the allowed-value enum is enforced in the handler (not as an OpenAPI
   * `items.enum`) so the server can return a targeted error for the comma-AND form.
   */
  'filter[principal_type]'?: Array<string>;

  /**
   * Query param: Filter on `resource_id` by exact match. Repeatable; repeated
   * instances OR across values. See `FilterValues` in the shared spec for the full
   * wire convention. Comma-separated single values are rejected with a 400 pointing
   * at the repeated-parameter OR form.
   */
  'filter[resource_id]'?: Array<string>;

  /**
   * Query param: Filter on `subject_id` by exact match. Repeatable; repeated
   * instances OR across values. Rows with `NULL` subject_id are excluded when this
   * filter is present. See `FilterValues` in the shared spec for the full wire
   * convention.
   */
  'filter[subject_id]'?: Array<string>;

  /**
   * Query param: Filter on `subject_type`. Repeatable; repeated instances OR across
   * values. See `FilterValues` in the shared spec for the full wire convention. Rows
   * with `NULL` subject_type are excluded when this filter is present.
   *
   * Allowed values: `user`, `application`. Unknown values return 400 with the list
   * of allowed values. Comma-separated single values are rejected with a 400
   * pointing at the repeated-parameter OR form.
   *
   * Note: the allowed-value enum is enforced in the handler.
   */
  'filter[subject_type]'?: Array<string>;

  /**
   * Query param: Maximum number of items to return per page.
   */
  limit?: number;

  /**
   * Query param: Sort direction. Default is desc (newest first).
   */
  order?: 'asc' | 'desc';

  /**
   * Query param: Case-insensitive substring search on `action`. Repeatable; if
   * multiple terms are supplied they are OR-ed.
   */
  'query[action]'?: Array<string>;

  /**
   * Query param: Field to sort by.
   */
  sort?: 'created_at';

  /**
   * Header param: API version header (date-based, e.g. 2026-02-01)
   */
  'X-API-Version'?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace PolicyEvaluations {
  export {
    type PolicyEvaluationCreateResponse as PolicyEvaluationCreateResponse,
    type PolicyEvaluationListRequestsResponse as PolicyEvaluationListRequestsResponse,
    type PolicyEvaluationCreateParams as PolicyEvaluationCreateParams,
    type PolicyEvaluationListRequestsParams as PolicyEvaluationListRequestsParams,
  };
}
