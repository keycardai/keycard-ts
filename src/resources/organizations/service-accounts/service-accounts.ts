// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as OrganizationsAPI from '../organizations';
import * as CredentialsAPI from './credentials';
import {
  CredentialCreateParams,
  CredentialCreateResponse,
  CredentialDeleteParams,
  CredentialListParams,
  CredentialListResponse,
  CredentialRetrieveParams,
  CredentialUpdateParams,
  Credentials,
  ServiceAccountCredential,
} from './credentials';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class ServiceAccounts extends APIResource {
  credentials: CredentialsAPI.Credentials = new CredentialsAPI.Credentials(this._client);

  /**
   * Create a new service account for an organization
   */
  create(
    organizationID: string,
    params: ServiceAccountCreateParams,
    options?: RequestOptions,
  ): APIPromise<ServiceAccount> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/organizations/${organizationID}/service-accounts`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get a specific service account
   */
  retrieve(
    serviceAccountID: string,
    params: ServiceAccountRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ServiceAccount> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID, ...query } = params;
    return this._client.get(path`/organizations/${organization_id}/service-accounts/${serviceAccountID}`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Update a service account
   */
  update(
    serviceAccountID: string,
    params: ServiceAccountUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ServiceAccount> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.patch(path`/organizations/${organization_id}/service-accounts/${serviceAccountID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * List service accounts for an organization
   */
  list(
    organizationID: string,
    params: ServiceAccountListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ServiceAccountListResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/organizations/${organizationID}/service-accounts`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete a service account
   */
  delete(
    serviceAccountID: string,
    params: ServiceAccountDeleteParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/organizations/${organization_id}/service-accounts/${serviceAccountID}`, {
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

export interface ServiceAccount {
  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * A name for the entity to be displayed in UI
   */
  name: string;

  /**
   * The time the entity was mostly recently updated in utc
   */
  updated_at: string;

  /**
   * Optional description of the service account
   */
  description?: string;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

export interface ServiceAccountListResponse {
  items: Array<ServiceAccount>;

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

export interface ServiceAccountCreateParams {
  /**
   * Body param: Service account name
   */
  name: string;

  /**
   * Body param: Optional description of the service account
   */
  description?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface ServiceAccountRetrieveParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Query param: Fields to expand in the response. Supports "permissions" to include
   * the permissions field with the caller's permissions for the resource. For list
   * organization identities only, "total_count" populates pagination.total_count
   * with the number of identities matching the same filters as the list (excluding
   * cursor and limit). Other operations ignore expand values they do not use.
   */
  expand?: Array<'permissions' | 'total_count'>;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface ServiceAccountUpdateParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Body param: Optional description of the service account
   */
  description?: string;

  /**
   * Body param: Service account name
   */
  name?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface ServiceAccountListParams {
  /**
   * Query param: Cursor for forward pagination
   */
  after?: string;

  /**
   * Query param: Cursor for backward pagination
   */
  before?: string;

  /**
   * Query param: Fields to expand in the response. Supports "permissions" to include
   * the permissions field with the caller's permissions for the resource. For list
   * organization identities only, "total_count" populates pagination.total_count
   * with the number of identities matching the same filters as the list (excluding
   * cursor and limit). Other operations ignore expand values they do not use.
   */
  expand?: Array<'permissions' | 'total_count'>;

  /**
   * Query param: Maximum number of service accounts to return
   */
  limit?: number;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface ServiceAccountDeleteParams {
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

ServiceAccounts.Credentials = Credentials;

export declare namespace ServiceAccounts {
  export {
    type ServiceAccount as ServiceAccount,
    type ServiceAccountListResponse as ServiceAccountListResponse,
    type ServiceAccountCreateParams as ServiceAccountCreateParams,
    type ServiceAccountRetrieveParams as ServiceAccountRetrieveParams,
    type ServiceAccountUpdateParams as ServiceAccountUpdateParams,
    type ServiceAccountListParams as ServiceAccountListParams,
    type ServiceAccountDeleteParams as ServiceAccountDeleteParams,
  };

  export {
    Credentials as Credentials,
    type ServiceAccountCredential as ServiceAccountCredential,
    type CredentialCreateResponse as CredentialCreateResponse,
    type CredentialListResponse as CredentialListResponse,
    type CredentialCreateParams as CredentialCreateParams,
    type CredentialRetrieveParams as CredentialRetrieveParams,
    type CredentialUpdateParams as CredentialUpdateParams,
    type CredentialListParams as CredentialListParams,
    type CredentialDeleteParams as CredentialDeleteParams,
  };
}
