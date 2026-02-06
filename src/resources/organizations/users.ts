// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
  /**
   * Get a specific user in an organization
   */
  retrieve(
    userID: string,
    params: UserRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<UserRetrieveResponse> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID, ...query } = params;
    return this._client.get(path`/organizations/${organization_id}/users/${userID}`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Update user status in an organization
   */
  update(userID: string, params: UserUpdateParams, options?: RequestOptions): APIPromise<UserUpdateResponse> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.patch(path`/organizations/${organization_id}/users/${userID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * List users in an organization
   */
  list(
    organizationID: string,
    params: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserListResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/organizations/${organizationID}/users`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Remove a user from an organization
   */
  delete(userID: string, params: UserDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/organizations/${organization_id}/users/${userID}`, {
      ...options,
      headers: buildHeaders([
        {
          Accept: '*/*',
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

export interface UserRetrieveResponse {
  /**
   * The keycard account ID
   */
  id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * User's role in the organization
   */
  role: 'org_admin' | 'org_member' | 'org_viewer';

  /**
   * Identity provider issuer
   */
  source: string;

  /**
   * Status of organization membership
   */
  status: 'active' | 'disabled';

  /**
   * The time the entity was mostly recently updated in utc
   */
  updated_at: string;

  /**
   * User email address
   */
  email?: string;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

export interface UserUpdateResponse {
  /**
   * The keycard account ID
   */
  id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * User's role in the organization
   */
  role: 'org_admin' | 'org_member' | 'org_viewer';

  /**
   * Identity provider issuer
   */
  source: string;

  /**
   * Status of organization membership
   */
  status: 'active' | 'disabled';

  /**
   * The time the entity was mostly recently updated in utc
   */
  updated_at: string;

  /**
   * User email address
   */
  email?: string;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

export interface UserListResponse {
  items: Array<UserListResponse.Item>;

  /**
   * Pagination information using cursor-based pagination
   */
  page_info: UserListResponse.PageInfo;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

export namespace UserListResponse {
  export interface Item {
    /**
     * The keycard account ID
     */
    id: string;

    /**
     * The time the entity was created in utc
     */
    created_at: string;

    /**
     * User's role in the organization
     */
    role: 'org_admin' | 'org_member' | 'org_viewer';

    /**
     * Identity provider issuer
     */
    source: string;

    /**
     * Status of organization membership
     */
    status: 'active' | 'disabled';

    /**
     * The time the entity was mostly recently updated in utc
     */
    updated_at: string;

    /**
     * User email address
     */
    email?: string;

    /**
     * Permissions granted to the authenticated principal for this resource. Only
     * populated when the 'expand[]=permissions' query parameter is provided. Keys are
     * resource types (e.g., "organizations"), values are objects mapping permission
     * names to boolean values indicating if the permission is granted.
     */
    permissions?: { [key: string]: { [key: string]: boolean } };
  }

  /**
   * Pagination information using cursor-based pagination
   */
  export interface PageInfo {
    /**
     * Whether there are more items after the current page
     */
    has_next_page: boolean;

    /**
     * Whether there are more items before the current page
     */
    has_prev_page: boolean;

    /**
     * Cursor pointing to the last item in the current page
     */
    end_cursor?: string;

    /**
     * Cursor pointing to the first item in the current page
     */
    start_cursor?: string;
  }
}

export interface UserRetrieveParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Query param: Fields to expand in the response. Currently supports "permissions"
   * to include the permissions field with the caller's permissions for the resource.
   */
  expand?: Array<'permissions'>;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface UserUpdateParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Body param: New role for the user in the organization
   */
  role?: 'org_admin' | 'org_member' | 'org_viewer';

  /**
   * Body param: New status for the user in the organization
   */
  status?: 'active' | 'disabled';

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface UserListParams {
  /**
   * Query param: Cursor for forward pagination
   */
  after?: string;

  /**
   * Query param: Cursor for backward pagination
   */
  before?: string;

  /**
   * Query param: Fields to expand in the response. Currently supports "permissions"
   * to include the permissions field with the caller's permissions for the resource.
   */
  expand?: Array<'permissions'>;

  /**
   * Query param: Maximum number of users to return
   */
  limit?: number;

  /**
   * Query param: Filter users by role
   */
  role?: 'org_admin' | 'org_member' | 'org_viewer';

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface UserDeleteParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace Users {
  export {
    type UserRetrieveResponse as UserRetrieveResponse,
    type UserUpdateResponse as UserUpdateResponse,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
  };
}
