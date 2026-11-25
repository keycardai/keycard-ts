// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Stateless Cedar policy validation
 */
export class PolicyValidations extends APIResource {
  /**
   * Validate Cedar policy content against a schema
   */
  create(
    zoneID: string,
    params: PolicyValidationCreateParams,
    options?: RequestOptions,
  ): APIPromise<PolicyValidationCreateResponse> {
    const { 'X-API-Version': xAPIVersion, 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/zones/${zoneID}/policy-validations`, {
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
}

export interface PolicyValidationCreateResponse {
  /**
   * Validation errors. Empty array when valid.
   */
  errors: Array<PolicyValidationCreateResponse.Error>;

  /**
   * Schema version validated against (echo back).
   */
  schema_version: string;

  /**
   * True if the policy passes schema validation with no errors.
   */
  valid: boolean;

  /**
   * Validation warnings. May be non-empty even when valid is true. References to
   * actions absent from the schema are reported here as per-occurrence warnings with
   * code `unknown_action` (partitioned out of errors: they do not make valid false).
   */
  warnings: Array<PolicyValidationCreateResponse.Warning>;
}

export namespace PolicyValidationCreateResponse {
  export interface Error {
    /**
     * Human-readable description of the validation issue.
     */
    message: string;

    /**
     * Machine-readable kind of the diagnostic (e.g. `unknown_action`, `parse_error`).
     * Optional and additive; absent when the finding has no specific code.
     */
    code?: string;

    /**
     * Optional structured details keyed by the diagnostic `code`, so consumers need
     * not parse `message`. For `unknown_action`: `{"action_uid": "..."}`.
     */
    data?: { [key: string]: string };

    /**
     * Optional advisory text, rendered by clients as secondary text below the primary
     * message.
     */
    help?: string;

    /**
     * Half-open source range [start, end) locating a diagnostic in the submitted
     * policy text. Optional: present only when the engine can map the finding to a
     * span. Populated for parse/syntax errors and for semantic findings when the
     * policy was submitted as `cedar_raw`; absent for whole-policy semantic findings
     * (no single span) and for policies submitted as `cedar_json` (the JSON AST
     * carries no source locations).
     */
    range?: Error.Range;

    /**
     * Severity of the diagnostic. Optional and additive; older clients that only read
     * `message` can ignore it. Diagnostics under `errors` are `error`; those under
     * `warnings` are `warning`.
     */
    severity?: 'error' | 'warning';
  }

  export namespace Error {
    /**
     * Half-open source range [start, end) locating a diagnostic in the submitted
     * policy text. Optional: present only when the engine can map the finding to a
     * span. Populated for parse/syntax errors and for semantic findings when the
     * policy was submitted as `cedar_raw`; absent for whole-policy semantic findings
     * (no single span) and for policies submitted as `cedar_json` (the JSON AST
     * carries no source locations).
     */
    export interface Range {
      /**
       * A position in the submitted policy text.
       */
      end: Range.End;

      /**
       * A position in the submitted policy text.
       */
      start: Range.Start;
    }

    export namespace Range {
      /**
       * A position in the submitted policy text.
       */
      export interface End {
        /**
         * 1-based column number (counts Unicode scalar values).
         */
        column: number;

        /**
         * 1-based line number.
         */
        line: number;

        /**
         * 0-based byte offset into the UTF-8 policy text.
         */
        offset: number;
      }

      /**
       * A position in the submitted policy text.
       */
      export interface Start {
        /**
         * 1-based column number (counts Unicode scalar values).
         */
        column: number;

        /**
         * 1-based line number.
         */
        line: number;

        /**
         * 0-based byte offset into the UTF-8 policy text.
         */
        offset: number;
      }
    }
  }

  export interface Warning {
    /**
     * Human-readable description of the validation issue.
     */
    message: string;

    /**
     * Machine-readable kind of the diagnostic (e.g. `unknown_action`, `parse_error`).
     * Optional and additive; absent when the finding has no specific code.
     */
    code?: string;

    /**
     * Optional structured details keyed by the diagnostic `code`, so consumers need
     * not parse `message`. For `unknown_action`: `{"action_uid": "..."}`.
     */
    data?: { [key: string]: string };

    /**
     * Optional advisory text, rendered by clients as secondary text below the primary
     * message.
     */
    help?: string;

    /**
     * Half-open source range [start, end) locating a diagnostic in the submitted
     * policy text. Optional: present only when the engine can map the finding to a
     * span. Populated for parse/syntax errors and for semantic findings when the
     * policy was submitted as `cedar_raw`; absent for whole-policy semantic findings
     * (no single span) and for policies submitted as `cedar_json` (the JSON AST
     * carries no source locations).
     */
    range?: Warning.Range;

    /**
     * Severity of the diagnostic. Optional and additive; older clients that only read
     * `message` can ignore it. Diagnostics under `errors` are `error`; those under
     * `warnings` are `warning`.
     */
    severity?: 'error' | 'warning';
  }

  export namespace Warning {
    /**
     * Half-open source range [start, end) locating a diagnostic in the submitted
     * policy text. Optional: present only when the engine can map the finding to a
     * span. Populated for parse/syntax errors and for semantic findings when the
     * policy was submitted as `cedar_raw`; absent for whole-policy semantic findings
     * (no single span) and for policies submitted as `cedar_json` (the JSON AST
     * carries no source locations).
     */
    export interface Range {
      /**
       * A position in the submitted policy text.
       */
      end: Range.End;

      /**
       * A position in the submitted policy text.
       */
      start: Range.Start;
    }

    export namespace Range {
      /**
       * A position in the submitted policy text.
       */
      export interface End {
        /**
         * 1-based column number (counts Unicode scalar values).
         */
        column: number;

        /**
         * 1-based line number.
         */
        line: number;

        /**
         * 0-based byte offset into the UTF-8 policy text.
         */
        offset: number;
      }

      /**
       * A position in the submitted policy text.
       */
      export interface Start {
        /**
         * 1-based column number (counts Unicode scalar values).
         */
        column: number;

        /**
         * 1-based line number.
         */
        line: number;

        /**
         * 0-based byte offset into the UTF-8 policy text.
         */
        offset: number;
      }
    }
  }
}

export interface PolicyValidationCreateParams {
  /**
   * Body param: Schema version to validate against. Must not be archived.
   */
  schema_version: string;

  /**
   * Body param: Cedar policy in JSON representation. Mutually exclusive with
   * cedar_raw.
   */
  cedar_json?: unknown | null;

  /**
   * Body param: Cedar policy in human-readable Cedar syntax. Mutually exclusive with
   * cedar_json.
   */
  cedar_raw?: string | null;

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

export declare namespace PolicyValidations {
  export {
    type PolicyValidationCreateResponse as PolicyValidationCreateResponse,
    type PolicyValidationCreateParams as PolicyValidationCreateParams,
  };
}
