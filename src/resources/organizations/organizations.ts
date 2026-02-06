// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InvitationsAPI from './invitations';
import {
  InvitationCreateParams,
  InvitationCreateResponse,
  InvitationDeleteParams,
  InvitationListParams,
  InvitationListResponse,
  Invitations,
} from './invitations';
import * as SSOConnectionAPI from './sso-connection';
import {
  SSOConnection,
  SSOConnectionDisableParams,
  SSOConnectionEnableParams,
  SSOConnectionEnableResponse,
  SSOConnectionRetrieveParams,
  SSOConnectionRetrieveResponse,
  SSOConnectionUpdateParams,
  SSOConnectionUpdateResponse,
} from './sso-connection';
import * as UsersAPI from './users';
import {
  UserDeleteParams,
  UserListParams,
  UserListResponse,
  UserRetrieveParams,
  UserRetrieveResponse,
  UserUpdateParams,
  UserUpdateResponse,
  Users,
} from './users';
import * as ServiceAccountsAPI from './service-accounts/service-accounts';
import {
  ServiceAccountCreateParams,
  ServiceAccountCreateResponse,
  ServiceAccountDeleteParams,
  ServiceAccountListParams,
  ServiceAccountListResponse,
  ServiceAccountRetrieveParams,
  ServiceAccountRetrieveResponse,
  ServiceAccountUpdateParams,
  ServiceAccountUpdateResponse,
  ServiceAccounts,
} from './service-accounts/service-accounts';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Organizations extends APIResource {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);
  invitations: InvitationsAPI.Invitations = new InvitationsAPI.Invitations(this._client);
  serviceAccounts: ServiceAccountsAPI.ServiceAccounts = new ServiceAccountsAPI.ServiceAccounts(this._client);
  ssoConnection: SSOConnectionAPI.SSOConnection = new SSOConnectionAPI.SSOConnection(this._client);

  create(
    params: OrganizationCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationCreateResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params ?? {};
    return this._client.post('/organizations', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get organization by ID or label
   */
  retrieve(
    organizationID: string,
    params: OrganizationRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationRetrieveResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/organizations/${organizationID}`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Update organization details
   */
  update(
    organizationID: string,
    params: OrganizationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationUpdateResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.patch(path`/organizations/${organizationID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * List organizations for the current user
   */
  list(
    params: OrganizationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationListResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get('/organizations', {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Exchange user token for organization-scoped M2M token
   */
  exchangeToken(
    organizationID: string,
    params: OrganizationExchangeTokenParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationExchangeTokenResponse> {
    const { 'X-Client-Request-ID': xClientRequestID } = params ?? {};
    return this._client.post(path`/organizations/${organizationID}/token`, {
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * List unified view of users and invitations in an organization
   */
  listIdentities(
    organizationID: string,
    params: OrganizationListIdentitiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationListIdentitiesResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/organizations/${organizationID}/identities`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Returns the list of available roles in the system for the organization. This
   * includes both organization-level roles (e.g., org_admin, org_member) and
   * zone-level roles (e.g., zone_manager, zone_viewer).
   *
   * Each role includes:
   *
   * - `name`: Internal identifier (e.g., org_admin, zone_manager)
   * - `label`: Human-readable display name (e.g., Organization Administrator)
   * - `scope`: Whether the role applies at organization or zone level
   */
  listRoles(
    organizationID: string,
    params: OrganizationListRolesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationListRolesResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/organizations/${organizationID}/roles`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface OrganizationCreateResponse {
  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * A domain name segment for the entity, often derived from the name.
   */
  label: string;

  /**
   * A name for the entity to be displayed in UI
   */
  name: string;

  /**
   * Whether SSO is enabled for this organization
   */
  sso_enabled: boolean;

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

export interface OrganizationRetrieveResponse {
  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * A domain name segment for the entity, often derived from the name.
   */
  label: string;

  /**
   * A name for the entity to be displayed in UI
   */
  name: string;

  /**
   * Whether SSO is enabled for this organization
   */
  sso_enabled: boolean;

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

export interface OrganizationUpdateResponse {
  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * A domain name segment for the entity, often derived from the name.
   */
  label: string;

  /**
   * A name for the entity to be displayed in UI
   */
  name: string;

  /**
   * Whether SSO is enabled for this organization
   */
  sso_enabled: boolean;

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

export interface OrganizationListResponse {
  items: Array<OrganizationListResponse.Item>;

  /**
   * Pagination information using cursor-based pagination
   */
  page_info: OrganizationListResponse.PageInfo;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

export namespace OrganizationListResponse {
  export interface Item {
    /**
     * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
     */
    id: string;

    /**
     * The time the entity was created in utc
     */
    created_at: string;

    /**
     * A domain name segment for the entity, often derived from the name.
     */
    label: string;

    /**
     * A name for the entity to be displayed in UI
     */
    name: string;

    /**
     * Whether SSO is enabled for this organization
     */
    sso_enabled: boolean;

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

/**
 * OAuth2-style token response for M2M tokens
 */
export interface OrganizationExchangeTokenResponse {
  /**
   * The M2M access token
   */
  access_token: string;

  /**
   * Token type (always "Bearer")
   */
  token_type: string;

  /**
   * Token expiration time in seconds
   */
  expires_in?: number;
}

/**
 * List of identities (users and invitations) in an organization
 */
export interface OrganizationListIdentitiesResponse {
  items: Array<OrganizationListIdentitiesResponse.Item>;

  /**
   * Pagination information using cursor-based pagination
   */
  page_info: OrganizationListIdentitiesResponse.PageInfo;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

export namespace OrganizationListIdentitiesResponse {
  /**
   * Unified view of users and invitations in an organization
   */
  export interface Item {
    /**
     * The identity ID (user or invitation)
     */
    id: string;

    /**
     * The time the entity was created in utc
     */
    created_at: string;

    /**
     * Email address of the identity
     */
    email: string;

    /**
     * Role in the organization
     */
    role: 'org_admin' | 'org_member' | 'org_viewer';

    /**
     * Identity provider issuer
     */
    source: string;

    /**
     * Status of the identity (OrganizationStatus for users, InvitationStatus for
     * invitations)
     */
    status: 'active' | 'disabled' | 'pending' | 'accepted' | 'expired' | 'revoked';

    /**
     * Type of identity (user or invitation)
     */
    type: 'user' | 'invitation';

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

/**
 * List of available roles
 */
export interface OrganizationListRolesResponse {
  /**
   * List of roles
   */
  items: Array<OrganizationListRolesResponse.Item>;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

export namespace OrganizationListRolesResponse {
  /**
   * A role definition that can be assigned to users
   */
  export interface Item {
    /**
     * Detailed description of the role and its permissions
     */
    description: string;

    /**
     * Human-readable display name for the role
     */
    label: string;

    /**
     * Internal identifier for the role (e.g., org_admin, zone_manager)
     */
    name: string;

    /**
     * The scope at which this role can be assigned (organization or zone)
     */
    scope: 'organization' | 'zone';
  }
}

export interface OrganizationCreateParams {
  /**
   * Body param: Organization name
   */
  name?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface OrganizationRetrieveParams {
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

export interface OrganizationUpdateParams {
  /**
   * Body param: Organization name
   */
  name?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface OrganizationListParams {
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
   * Query param: Maximum number of organizations to return
   */
  limit?: number;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface OrganizationExchangeTokenParams {
  /**
   * Unique request identifier specified by the originating caller and passed along
   * by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface OrganizationListIdentitiesParams {
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
   * Query param: Maximum number of identities to return
   */
  limit?: number;

  /**
   * Query param: Filter identities by role
   */
  role?: 'org_admin' | 'org_member' | 'org_viewer';

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface OrganizationListRolesParams {
  /**
   * Query param: Fields to expand in the response. Currently supports "permissions"
   * to include the permissions field with the caller's permissions for the resource.
   */
  expand?: Array<'permissions'>;

  /**
   * Query param: Filter roles by scope (organization or zone level)
   */
  scope?: 'organization' | 'zone';

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

Organizations.Users = Users;
Organizations.Invitations = Invitations;
Organizations.ServiceAccounts = ServiceAccounts;
Organizations.SSOConnection = SSOConnection;

export declare namespace Organizations {
  export {
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationRetrieveResponse as OrganizationRetrieveResponse,
    type OrganizationUpdateResponse as OrganizationUpdateResponse,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationExchangeTokenResponse as OrganizationExchangeTokenResponse,
    type OrganizationListIdentitiesResponse as OrganizationListIdentitiesResponse,
    type OrganizationListRolesResponse as OrganizationListRolesResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationRetrieveParams as OrganizationRetrieveParams,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationListParams as OrganizationListParams,
    type OrganizationExchangeTokenParams as OrganizationExchangeTokenParams,
    type OrganizationListIdentitiesParams as OrganizationListIdentitiesParams,
    type OrganizationListRolesParams as OrganizationListRolesParams,
  };

  export {
    Users as Users,
    type UserRetrieveResponse as UserRetrieveResponse,
    type UserUpdateResponse as UserUpdateResponse,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
  };

  export {
    Invitations as Invitations,
    type InvitationCreateResponse as InvitationCreateResponse,
    type InvitationListResponse as InvitationListResponse,
    type InvitationCreateParams as InvitationCreateParams,
    type InvitationListParams as InvitationListParams,
    type InvitationDeleteParams as InvitationDeleteParams,
  };

  export {
    ServiceAccounts as ServiceAccounts,
    type ServiceAccountCreateResponse as ServiceAccountCreateResponse,
    type ServiceAccountRetrieveResponse as ServiceAccountRetrieveResponse,
    type ServiceAccountUpdateResponse as ServiceAccountUpdateResponse,
    type ServiceAccountListResponse as ServiceAccountListResponse,
    type ServiceAccountCreateParams as ServiceAccountCreateParams,
    type ServiceAccountRetrieveParams as ServiceAccountRetrieveParams,
    type ServiceAccountUpdateParams as ServiceAccountUpdateParams,
    type ServiceAccountListParams as ServiceAccountListParams,
    type ServiceAccountDeleteParams as ServiceAccountDeleteParams,
  };

  export {
    SSOConnection as SSOConnection,
    type SSOConnectionRetrieveResponse as SSOConnectionRetrieveResponse,
    type SSOConnectionUpdateResponse as SSOConnectionUpdateResponse,
    type SSOConnectionEnableResponse as SSOConnectionEnableResponse,
    type SSOConnectionRetrieveParams as SSOConnectionRetrieveParams,
    type SSOConnectionUpdateParams as SSOConnectionUpdateParams,
    type SSOConnectionDisableParams as SSOConnectionDisableParams,
    type SSOConnectionEnableParams as SSOConnectionEnableParams,
  };
}
