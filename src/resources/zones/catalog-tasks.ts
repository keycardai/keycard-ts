// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Track the progress of install and uninstall operations.
 */
export class CatalogTasks extends APIResource {
  /**
   * Returns 200 with task details when pending, running, or failed. Returns 303
   * redirect to the install when completed.
   */
  retrieve(taskID: string, params: CatalogTaskRetrieveParams, options?: RequestOptions): APIPromise<Task> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.get(path`/zones/${zone_id}/catalog_tasks/${taskID}`, {
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

export interface Task {
  id: string;

  created_at: string;

  operation: TaskOperation;

  status: TaskStatus;

  updated_at: string;

  error_message?: string;

  install_id?: string;

  links?: Array<Task.Link>;

  package_id?: string;

  package_slug?: string;

  package_version?: number;

  /**
   * Informational warnings about the task outcome. For delete tasks, warns when
   * adopted entities (pre-existing resources not created by the catalog) will be
   * preserved rather than deleted.
   */
  warnings?: Array<Task.Warning>;
}

export namespace Task {
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

  /**
   * Represents an error that has occurred in the Keycard system.
   */
  export interface Warning {
    code:
      | 'validation_error'
      | 'bad_request'
      | 'unauthorized'
      | 'forbidden'
      | 'not_found'
      | 'conflict'
      | 'rate_limit_exceeded'
      | 'internal_error'
      | 'service_unavailable';

    details: Array<Warning.Detail>;

    /**
     * summary of the error
     */
    message: string;

    path: string;

    request_id: string;

    /**
     * HTTP Status Code
     */
    status: number;

    timestamp: string;
  }

  export namespace Warning {
    export interface Detail {
      code:
        | 'validation_error'
        | 'bad_request'
        | 'unauthorized'
        | 'forbidden'
        | 'not_found'
        | 'conflict'
        | 'rate_limit_exceeded'
        | 'internal_error'
        | 'service_unavailable';

      /**
       * valid json path for request body
       */
      field: string;

      /**
       * error message for specific error
       */
      message: string;
    }
  }
}

export type TaskOperation = 'create' | 'delete';

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface CatalogTaskRetrieveParams {
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

export declare namespace CatalogTasks {
  export {
    type Task as Task,
    type TaskOperation as TaskOperation,
    type TaskStatus as TaskStatus,
    type CatalogTaskRetrieveParams as CatalogTaskRetrieveParams,
  };
}
