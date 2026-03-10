// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OrganizationsAPI from './organizations';
import * as UsersAPI from './users';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Invitations extends APIResource {
  /**
   * Create an invitation to join an organization
   */
  create(
    organizationID: string,
    params: InvitationCreateParams,
    options?: RequestOptions,
  ): APIPromise<Invitation> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/organizations/${organizationID}/invitations`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * List invitations for an organization
   */
  list(
    organizationID: string,
    params: InvitationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InvitationListResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/organizations/${organizationID}/invitations`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Delete an invitation
   */
  delete(invitationID: string, params: InvitationDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/organizations/${organization_id}/invitations/${invitationID}`, {
      ...options,
      headers: buildHeaders([
        {
          Accept: '*/*',
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
      __security: {},
    });
  }
}

export interface Invitation {
  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * ID of the user who created the invitation
   */
  created_by: string;

  /**
   * Email address for the invitation
   */
  email: string;

  /**
   * When the invitation expires
   */
  expires_at: string;

  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  organization_id: string;

  /**
   * Role that will be assigned when invitation is accepted
   */
  role: UsersAPI.OrganizationRole;

  /**
   * Status of an invitation
   */
  status: InvitationStatus;

  /**
   * The time the entity was mostly recently updated in utc
   */
  updated_at: string;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

/**
 * Status of an invitation
 */
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'revoked';

export interface InvitationListResponse {
  items: Array<Invitation>;

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

export interface InvitationCreateParams {
  /**
   * Body param: Email address to invite
   */
  email: string;

  /**
   * Body param: Role to assign when invitation is accepted
   */
  role: UsersAPI.OrganizationRole;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface InvitationListParams {
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
   * Query param: Maximum number of invitations to return
   */
  limit?: number;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface InvitationDeleteParams {
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

export declare namespace Invitations {
  export {
    type Invitation as Invitation,
    type InvitationStatus as InvitationStatus,
    type InvitationListResponse as InvitationListResponse,
    type InvitationCreateParams as InvitationCreateParams,
    type InvitationListParams as InvitationListParams,
    type InvitationDeleteParams as InvitationDeleteParams,
  };
}
