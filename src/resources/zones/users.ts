// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
  /**
   * Returns details of a specific user by user ID
   */
  retrieve(id: string, params: UserRetrieveParams, options?: RequestOptions): APIPromise<User> {
    const { zoneId } = params
    return this._client.get(path`/zones/${zoneId}/users/${id}`, options);
  }

  /**
   * Returns users in the specified zone with cursor-based pagination (after, before,
   * limit). Use expand[]=total_count to include the total number of matching users.
   * Exact match: filter[email] (repeatable for OR). Substring search
   * (case-insensitive, repeatable for OR within each parameter): query[email],
   * query[subject], query[identifier], query[] (across email, identifier, and
   * subject). Non-empty query parameters are combined with AND.
   */
  list(zoneID: string, query: UserListParams | null | undefined = {}, options?: RequestOptions): APIPromise<UserListResponse> {
    return this._client.get(path`/zones/${zoneID}/users`, { query, ...options });
  }
}

/**
 * An authenticated user entity
 */
export interface User {
  /**
   * Unique identifier of the user
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * Email address of the user
   */
  email: string;

  /**
   * Whether the email address has been verified
   */
  email_verified: boolean;

  /**
   * Zone-scoped user identifier. Defaults to the user's Keycard ID. When the
   * provider has user_identifier_claim configured, the value is set from that claim
   * at user creation time.
   */
  identifier: string;

  /**
   * Organization that owns this user
   */
  organization_id: string;

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Zone this user belongs to
   */
  zone_id: string;

  /**
   * Date when the user was last authenticated
   */
  authenticated_at?: string;

  /**
   * Issuer identifier of the identity provider
   */
  issuer?: string;

  /**
   * Reference to the identity provider. This field is undefined when the source
   * identity provider is deleted but the user is not deleted.
   */
  provider_id?: string;

  /**
   * Subject identifier from the identity provider
   */
  subject?: string;
}

export interface UserListResponse {
  items: Array<User>;

  /**
   * Cursor-based pagination metadata
   */
  pagination: UserListResponse.Pagination;
}

export namespace UserListResponse {
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

export interface UserRetrieveParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export interface UserListParams {
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
   * Filter by exact email address
   */
  'filter[email]'?: string | Array<string>;

  /**
   * Maximum number of items to return
   */
  limit?: number;

  /**
   * Search across email, identifier, and federated subject (substring match)
   */
  'query[]'?: string | Array<string>;

  /**
   * Search by email (substring match)
   */
  'query[email]'?: string | Array<string>;

  /**
   * Search by user identifier (substring match)
   */
  'query[identifier]'?: string | Array<string>;

  /**
   * Search by federated credential subject (substring match)
   */
  'query[subject]'?: string | Array<string>;
}

export declare namespace Users {
  export {
    type User as User,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams
  };
}
