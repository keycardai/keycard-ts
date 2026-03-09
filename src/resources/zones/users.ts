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
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/users/${id}`, { ...options, __security: {} });
  }

  /**
   * Returns a list of users in the specified zone. Can be filtered by email address.
   */
  list(
    zoneID: string,
    query: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserListResponse> {
    return this._client.get(path`/zones/${zoneID}/users`, { query, ...options, __security: {} });
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
   * Issuer identifier of the identity provider
   */
  issuer: string;

  /**
   * Organization that owns this user
   */
  organization_id: string;

  /**
   * Subject identifier from the identity provider
   */
  subject: string;

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
   * Reference to the identity provider. This field is undefined when the source
   * identity provider is deleted but the user is not deleted.
   */
  provider_id?: string;
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
   * Maximum number of items to return
   */
  limit?: number;
}

export declare namespace Users {
  export {
    type User as User,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
  };
}
