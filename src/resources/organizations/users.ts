// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OrganizationsAPI from './organizations';
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
  ): APIPromise<OrganizationUser> {
    const {
      organization_id,
      'X-Client-Request-ID': xClientRequestID,
      'X-Request-ID': xRequestID,
      ...query
    } = params;
    return this._client.get(path`/organizations/${organization_id}/users/${userID}`, {
      query,
      ...options,
      headers: buildHeaders([
        {
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
          ...(xRequestID != null ? { 'X-Request-ID': xRequestID } : undefined),
        },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Update user status in an organization
   */
  update(userID: string, params: UserUpdateParams, options?: RequestOptions): APIPromise<OrganizationUser> {
    const {
      organization_id,
      'X-Client-Request-ID': xClientRequestID,
      'X-Request-ID': xRequestID,
      ...body
    } = params;
    return this._client.patch(path`/organizations/${organization_id}/users/${userID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
          ...(xRequestID != null ? { 'X-Request-ID': xRequestID } : undefined),
        },
        options?.headers,
      ]),
      __security: {},
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
    const { 'X-Client-Request-ID': xClientRequestID, 'X-Request-ID': xRequestID, ...query } = params ?? {};
    return this._client.get(path`/organizations/${organizationID}/users`, {
      query,
      ...options,
      headers: buildHeaders([
        {
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
          ...(xRequestID != null ? { 'X-Request-ID': xRequestID } : undefined),
        },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Remove a user from an organization
   */
  delete(userID: string, params: UserDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID, 'X-Request-ID': xRequestID } = params;
    return this._client.delete(path`/organizations/${organization_id}/users/${userID}`, {
      ...options,
      headers: buildHeaders([
        {
          Accept: '*/*',
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
          ...(xRequestID != null ? { 'X-Request-ID': xRequestID } : undefined),
        },
        options?.headers,
      ]),
      __security: {},
    });
  }
}

/**
 * User's role in the organization
 */
export type OrganizationRole = 'org_admin' | 'org_member' | 'org_viewer';

/**
 * Status of organization membership
 */
export type OrganizationStatus = 'active' | 'disabled';

export interface OrganizationUser {
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
  role: OrganizationRole;

  /**
   * Identity provider issuer
   */
  source: string;

  /**
   * Status of organization membership
   */
  status: OrganizationStatus;

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
  items: Array<OrganizationUser>;

  /**
   * Pagination information using cursor-based pagination
   */
  page_info: OrganizationsAPI.PageInfoCursor;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
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

  /**
   * Header param: Unique request identifier only provided if the upstream caller is
   * a Keycard service.
   */
  'X-Request-ID'?: string;
}

export interface UserUpdateParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Body param: New role for the user in the organization
   */
  role?: OrganizationRole;

  /**
   * Body param: New status for the user in the organization
   */
  status?: OrganizationStatus;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;

  /**
   * Header param: Unique request identifier only provided if the upstream caller is
   * a Keycard service.
   */
  'X-Request-ID'?: string;
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
  role?: OrganizationRole;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;

  /**
   * Header param: Unique request identifier only provided if the upstream caller is
   * a Keycard service.
   */
  'X-Request-ID'?: string;
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

  /**
   * Header param: Unique request identifier only provided if the upstream caller is
   * a Keycard service.
   */
  'X-Request-ID'?: string;
}

export declare namespace Users {
  export {
    type OrganizationRole as OrganizationRole,
    type OrganizationStatus as OrganizationStatus,
    type OrganizationUser as OrganizationUser,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
  };
}
