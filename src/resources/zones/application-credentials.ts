// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProvidersAPI from './providers';
import * as ZonesAPI from './zones';
import * as ApplicationsAPI from './applications/applications';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ApplicationCredentials extends APIResource {
  /**
   * Creates a new application credential
   */
  create(
    zoneID: string,
    body: ApplicationCredentialCreateParams,
    options?: RequestOptions,
  ): APIPromise<ApplicationCredentialCreateResponse> {
    return this._client.post(path`/zones/${zoneID}/application-credentials`, { body, ...options });
  }

  /**
   * Returns details of a specific application credential by ID
   */
  retrieve(
    id: string,
    params: ApplicationCredentialRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<Credential> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/application-credentials/${id}`, options);
  }

  /**
   * Updates an application credential's configuration
   */
  update(
    id: string,
    params: ApplicationCredentialUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Credential> {
    const { zoneId, ...body } = params;
    return this._client.patch(path`/zones/${zoneId}/application-credentials/${id}`, { body, ...options });
  }

  /**
   * Returns a list of application credentials in the specified zone
   */
  list(
    zoneID: string,
    query: ApplicationCredentialListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ApplicationCredentialListResponse> {
    return this._client.get(path`/zones/${zoneID}/application-credentials`, { query, ...options });
  }

  /**
   * Permanently deletes an application credential
   */
  delete(id: string, params: ApplicationCredentialDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/application-credentials/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Common fields shared by all application credential types
 */
export interface BaseFields {
  /**
   * Unique identifier of the credential
   */
  id: string;

  /**
   * ID of the application this credential belongs to
   */
  application_id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * Organization that owns this credential
   */
  organization_id: string;

  /**
   * URL-safe identifier, unique within the zone
   */
  slug: string;

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Zone this credential belongs to
   */
  zone_id: string;

  /**
   * @deprecated An Application is a software system with an associated identity that
   * can access Resources. It may act on its own behalf (machine-to-machine) or on
   * behalf of a user (delegated access).
   */
  application?: ApplicationsAPI.Application;
}

/**
 * Credentials for accessing external services from applications
 */
export type Credential = Token | Password | PublicKey | URL | Public;

/**
 * Password-based application credential
 */
export interface Password extends BaseFields {
  /**
   * Username for password credential, also used as OAuth 2.0 client ID
   */
  identifier: string;

  type: 'password';

  /**
   * Password for credential (only returned on creation, store securely), also used
   * as OAuth 2.0 client secret
   */
  password?: string;
}

/**
 * Public credential (no secret storage)
 */
export interface Public extends BaseFields {
  /**
   * Identifier for public credential, also used as OAuth 2.0 client ID
   */
  identifier: string;

  type: 'public';
}

/**
 * Public key-based application credential
 */
export interface PublicKey extends BaseFields {
  /**
   * Client ID for public key credential, also used as OAuth 2.0 client ID
   */
  identifier: string;

  /**
   * JWKS URI to retrieve public keys from
   */
  jwks_uri: string;

  type: 'public-key';
}

/**
 * Token-based application credential
 */
export interface Token extends BaseFields {
  /**
   * Identifier for this credential. For token type, this equals the subject value,
   * or '\*' when subject is not specified.
   */
  identifier: string;

  /**
   * ID of the provider issuing tokens verified by this credential
   */
  provider_id: string;

  type: 'token';

  /**
   * @deprecated A Provider is a system that supplies access to Resources and allows
   * actors (Users or Applications) to authenticate.
   */
  provider?: ProvidersAPI.Provider;

  /**
   * Subject identifier for the token. When null or omitted, any token from the
   * provider is accepted without checking application-specific claims.
   */
  subject?: string | null;
}

/**
 * URL-based application credential
 */
export interface URL extends BaseFields {
  /**
   * URL of the credential (must be a valid URL)
   */
  identifier: string;

  type: 'url';
}

/**
 * Response for creating a new application credential
 */
export type ApplicationCredentialCreateResponse = Token | Password | PublicKey | URL | Public;

export interface ApplicationCredentialListResponse {
  items: Array<Credential>;

  /**
   * Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;

  /**
   * Cursor-based pagination metadata
   */
  pagination: ApplicationCredentialListResponse.Pagination;
}

export namespace ApplicationCredentialListResponse {
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

export type ApplicationCredentialCreateParams =
  | ApplicationCredentialCreateParams.IamApplicationCredentialCreateToken
  | ApplicationCredentialCreateParams.IamApplicationCredentialCreatePassword
  | ApplicationCredentialCreateParams.IamApplicationCredentialCreatePublicKey
  | ApplicationCredentialCreateParams.IamApplicationCredentialCreateURL
  | ApplicationCredentialCreateParams.IamApplicationCredentialCreatePublic;

export declare namespace ApplicationCredentialCreateParams {
  export interface IamApplicationCredentialCreateToken {
    /**
     * ID of the application this credential belongs to
     */
    application_id: string;

    /**
     * ID of the provider issuing tokens this credential verifies
     */
    provider_id: string;

    type: 'token';

    /**
     * Subject identifier for the token. When omitted, any token from the provider is
     * accepted without checking application-specific claims.
     */
    subject?: string;
  }

  export interface IamApplicationCredentialCreatePassword {
    /**
     * ID of the application this credential belongs to
     */
    application_id: string;

    type: 'password';

    /**
     * Username for password credential, also used as OAuth 2.0 client ID
     * (auto-generated if not provided)
     */
    identifier?: string;
  }

  export interface IamApplicationCredentialCreatePublicKey {
    /**
     * ID of the application this credential belongs to
     */
    application_id: string;

    /**
     * JWKS URI to retrieve public keys from
     */
    jwks_uri: string;

    type: 'public-key';

    /**
     * Client ID for public key credential, also used as OAuth 2.0 client ID
     * (auto-generated if not provided)
     */
    identifier?: string;
  }

  export interface IamApplicationCredentialCreateURL {
    /**
     * ID of the application this credential belongs to
     */
    application_id: string;

    /**
     * URL of the credential (must be a valid URL)
     */
    identifier: string;

    type: 'url';
  }

  export interface IamApplicationCredentialCreatePublic {
    /**
     * ID of the application this credential belongs to
     */
    application_id: string;

    type: 'public';

    /**
     * Identifier for public credential, also used as OAuth 2.0 client ID
     * (auto-generated if not provided)
     */
    identifier?: string;
  }
}

export interface ApplicationCredentialRetrieveParams {
  zoneId: string;
}

export type ApplicationCredentialUpdateParams =
  | ApplicationCredentialUpdateParams.IamTokenCredentialUpdate
  | ApplicationCredentialUpdateParams.IamPasswordCredentialUpdate
  | ApplicationCredentialUpdateParams.IamPublicKeyCredentialUpdate
  | ApplicationCredentialUpdateParams.IamURLCredentialUpdate
  | ApplicationCredentialUpdateParams.IamPublicCredentialUpdate;

export declare namespace ApplicationCredentialUpdateParams {
  export interface IamTokenCredentialUpdate {
    /**
     * Path param
     */
    zoneId: string;

    /**
     * Body param: Subject identifier for the token. Set to null to unset, which allows
     * any token from the provider to be accepted without checking application-specific
     * claims.
     */
    subject?: string | null;

    /**
     * Body param
     */
    type?: 'token';
  }

  export interface IamPasswordCredentialUpdate {
    /**
     * Path param
     */
    zoneId: string;

    /**
     * Body param
     */
    type?: 'password';
  }

  export interface IamPublicKeyCredentialUpdate {
    /**
     * Path param
     */
    zoneId: string;

    /**
     * Body param
     */
    type?: 'public-key';
  }

  export interface IamURLCredentialUpdate {
    /**
     * Path param
     */
    zoneId: string;

    /**
     * Body param: URL of the credential (must be a valid URL)
     */
    identifier?: string;

    /**
     * Body param
     */
    type?: 'url';
  }

  export interface IamPublicCredentialUpdate {
    /**
     * Path param
     */
    zoneId: string;

    /**
     * Body param: Identifier for public credential, also used as OAuth 2.0 client ID
     */
    identifier?: string;

    /**
     * Body param
     */
    type?: 'public';
  }
}

export interface ApplicationCredentialListParams {
  /**
   * Cursor for forward pagination
   */
  after?: string;

  applicationId?: string;

  /**
   * Cursor for backward pagination
   */
  before?: string;

  cursor?: string;

  'expand[]'?: 'total_count' | Array<'total_count'>;

  /**
   * Maximum number of items to return
   */
  limit?: number;

  slug?: string;
}

export interface ApplicationCredentialDeleteParams {
  zoneId: string;
}

export declare namespace ApplicationCredentials {
  export {
    type BaseFields as BaseFields,
    type Credential as Credential,
    type Password as Password,
    type Public as Public,
    type PublicKey as PublicKey,
    type Token as Token,
    type URL as URL,
    type ApplicationCredentialCreateResponse as ApplicationCredentialCreateResponse,
    type ApplicationCredentialListResponse as ApplicationCredentialListResponse,
    type ApplicationCredentialCreateParams as ApplicationCredentialCreateParams,
    type ApplicationCredentialRetrieveParams as ApplicationCredentialRetrieveParams,
    type ApplicationCredentialUpdateParams as ApplicationCredentialUpdateParams,
    type ApplicationCredentialListParams as ApplicationCredentialListParams,
    type ApplicationCredentialDeleteParams as ApplicationCredentialDeleteParams,
  };
}
