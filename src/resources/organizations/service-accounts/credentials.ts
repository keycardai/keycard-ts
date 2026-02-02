// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as OrganizationsAPI from '../organizations';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Credentials extends APIResource {
  /**
   * Create a new credential for a service account
   */
  create(
    serviceAccountID: string,
    params: CredentialCreateParams,
    options?: RequestOptions,
  ): APIPromise<CredentialCreateResponse> {
    const {
      organization_id,
      'X-Client-Request-ID': xClientRequestID,
      'X-Request-ID': xRequestID,
      ...body
    } = params;
    return this._client.post(
      path`/organizations/${organization_id}/service-accounts/${serviceAccountID}/credentials`,
      {
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
      },
    );
  }

  /**
   * Get a specific service account credential
   */
  retrieve(
    credentialID: string,
    params: CredentialRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ServiceAccountCredential> {
    const {
      organization_id,
      service_account_id,
      'X-Client-Request-ID': xClientRequestID,
      'X-Request-ID': xRequestID,
      ...query
    } = params;
    return this._client.get(
      path`/organizations/${organization_id}/service-accounts/${service_account_id}/credentials/${credentialID}`,
      {
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
      },
    );
  }

  /**
   * Update a service account credential
   */
  update(
    credentialID: string,
    params: CredentialUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ServiceAccountCredential> {
    const {
      organization_id,
      service_account_id,
      'X-Client-Request-ID': xClientRequestID,
      'X-Request-ID': xRequestID,
      ...body
    } = params;
    return this._client.patch(
      path`/organizations/${organization_id}/service-accounts/${service_account_id}/credentials/${credentialID}`,
      {
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
      },
    );
  }

  /**
   * List credentials for a service account
   */
  list(
    serviceAccountID: string,
    params: CredentialListParams,
    options?: RequestOptions,
  ): APIPromise<CredentialListResponse> {
    const {
      organization_id,
      'X-Client-Request-ID': xClientRequestID,
      'X-Request-ID': xRequestID,
      ...query
    } = params;
    return this._client.get(
      path`/organizations/${organization_id}/service-accounts/${serviceAccountID}/credentials`,
      {
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
      },
    );
  }

  /**
   * Delete a service account credential
   */
  delete(credentialID: string, params: CredentialDeleteParams, options?: RequestOptions): APIPromise<void> {
    const {
      organization_id,
      service_account_id,
      'X-Client-Request-ID': xClientRequestID,
      'X-Request-ID': xRequestID,
    } = params;
    return this._client.delete(
      path`/organizations/${organization_id}/service-accounts/${service_account_id}/credentials/${credentialID}`,
      {
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
      },
    );
  }
}

/**
 * Service account credential (without secret)
 */
export interface ServiceAccountCredential {
  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  id: string;

  /**
   * The client ID for authentication
   */
  client_id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * A name for the entity to be displayed in UI
   */
  name: string;

  /**
   * Optional description of the credential
   */
  description?: string;

  /**
   * When the credential was last used
   */
  last_used_at?: string;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

/**
 * Service account credential with plaintext secret (only returned on creation)
 */
export interface CredentialCreateResponse {
  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  id: string;

  /**
   * The client ID for authentication
   */
  client_id: string;

  /**
   * The client secret
   */
  client_secret: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * A name for the entity to be displayed in UI
   */
  name: string;

  /**
   * Optional description of the credential
   */
  description?: string;
}

export interface CredentialListResponse {
  items: Array<ServiceAccountCredential>;

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

export interface CredentialCreateParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Body param: Credential name
   */
  name: string;

  /**
   * Body param: Optional description of the credential
   */
  description?: string;

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

export interface CredentialRetrieveParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Path param: Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  service_account_id: string;

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

export interface CredentialUpdateParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Path param: Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  service_account_id: string;

  /**
   * Body param: Optional description of the credential
   */
  description?: string;

  /**
   * Body param: Credential name
   */
  name?: string;

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

export interface CredentialListParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

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
   * Query param: Maximum number of credentials to return
   */
  limit?: number;

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

export interface CredentialDeleteParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Path param: Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  service_account_id: string;

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

export declare namespace Credentials {
  export {
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
