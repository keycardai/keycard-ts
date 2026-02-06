// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class SSOConnection extends APIResource {
  /**
   * Get SSO connection configuration for organization
   */
  retrieve(
    organizationID: string,
    params: SSOConnectionRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SSOConnectionRetrieveResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/organizations/${organizationID}/sso-connection`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Update SSO connection configuration
   */
  update(
    organizationID: string,
    params: SSOConnectionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SSOConnectionUpdateResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.patch(path`/organizations/${organizationID}/sso-connection`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Disable SSO for organization
   */
  disable(
    organizationID: string,
    params: SSOConnectionDisableParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { 'X-Client-Request-ID': xClientRequestID } = params ?? {};
    return this._client.delete(path`/organizations/${organizationID}/sso-connection`, {
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

  /**
   * Enable SSO for organization
   */
  enable(
    organizationID: string,
    params: SSOConnectionEnableParams,
    options?: RequestOptions,
  ): APIPromise<SSOConnectionEnableResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/organizations/${organizationID}/sso-connection`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * SSO connection configuration for an organization
 */
export interface SSOConnectionRetrieveResponse {
  /**
   * Unique identifier for the SSO connection
   */
  id: string;

  /**
   * OAuth 2.0 client ID
   */
  client_id: string | null;

  /**
   * Whether a client secret is configured
   */
  client_secret_set: boolean;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * SSO provider identifier (e.g., issuer URL)
   */
  identifier: string;

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

  /**
   * Protocol configuration for SSO connection
   */
  protocols?: SSOConnectionRetrieveResponse.Protocols | null;
}

export namespace SSOConnectionRetrieveResponse {
  /**
   * Protocol configuration for SSO connection
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    oauth2?: Protocols.Oauth2 | null;

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    openid?: Protocols.Openid | null;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    export interface Oauth2 {
      /**
       * OAuth 2.0 authorization endpoint
       */
      authorization_endpoint?: string | null;

      /**
       * Supported PKCE code challenge methods
       */
      code_challenge_methods_supported?: Array<string> | null;

      /**
       * JSON Web Key Set endpoint
       */
      jwks_uri?: string | null;

      /**
       * OAuth 2.0 registration endpoint
       */
      registration_endpoint?: string | null;

      /**
       * Supported OAuth 2.0 scopes
       */
      scopes_supported?: Array<string> | null;

      /**
       * OAuth 2.0 token endpoint
       */
      token_endpoint?: string | null;
    }

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    export interface Openid {
      /**
       * OpenID Connect UserInfo endpoint
       */
      userinfo_endpoint?: string | null;
    }
  }
}

/**
 * SSO connection configuration for an organization
 */
export interface SSOConnectionUpdateResponse {
  /**
   * Unique identifier for the SSO connection
   */
  id: string;

  /**
   * OAuth 2.0 client ID
   */
  client_id: string | null;

  /**
   * Whether a client secret is configured
   */
  client_secret_set: boolean;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * SSO provider identifier (e.g., issuer URL)
   */
  identifier: string;

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

  /**
   * Protocol configuration for SSO connection
   */
  protocols?: SSOConnectionUpdateResponse.Protocols | null;
}

export namespace SSOConnectionUpdateResponse {
  /**
   * Protocol configuration for SSO connection
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    oauth2?: Protocols.Oauth2 | null;

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    openid?: Protocols.Openid | null;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    export interface Oauth2 {
      /**
       * OAuth 2.0 authorization endpoint
       */
      authorization_endpoint?: string | null;

      /**
       * Supported PKCE code challenge methods
       */
      code_challenge_methods_supported?: Array<string> | null;

      /**
       * JSON Web Key Set endpoint
       */
      jwks_uri?: string | null;

      /**
       * OAuth 2.0 registration endpoint
       */
      registration_endpoint?: string | null;

      /**
       * Supported OAuth 2.0 scopes
       */
      scopes_supported?: Array<string> | null;

      /**
       * OAuth 2.0 token endpoint
       */
      token_endpoint?: string | null;
    }

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    export interface Openid {
      /**
       * OpenID Connect UserInfo endpoint
       */
      userinfo_endpoint?: string | null;
    }
  }
}

/**
 * SSO connection configuration for an organization
 */
export interface SSOConnectionEnableResponse {
  /**
   * Unique identifier for the SSO connection
   */
  id: string;

  /**
   * OAuth 2.0 client ID
   */
  client_id: string | null;

  /**
   * Whether a client secret is configured
   */
  client_secret_set: boolean;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * SSO provider identifier (e.g., issuer URL)
   */
  identifier: string;

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

  /**
   * Protocol configuration for SSO connection
   */
  protocols?: SSOConnectionEnableResponse.Protocols | null;
}

export namespace SSOConnectionEnableResponse {
  /**
   * Protocol configuration for SSO connection
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    oauth2?: Protocols.Oauth2 | null;

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    openid?: Protocols.Openid | null;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    export interface Oauth2 {
      /**
       * OAuth 2.0 authorization endpoint
       */
      authorization_endpoint?: string | null;

      /**
       * Supported PKCE code challenge methods
       */
      code_challenge_methods_supported?: Array<string> | null;

      /**
       * JSON Web Key Set endpoint
       */
      jwks_uri?: string | null;

      /**
       * OAuth 2.0 registration endpoint
       */
      registration_endpoint?: string | null;

      /**
       * Supported OAuth 2.0 scopes
       */
      scopes_supported?: Array<string> | null;

      /**
       * OAuth 2.0 token endpoint
       */
      token_endpoint?: string | null;
    }

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    export interface Openid {
      /**
       * OpenID Connect UserInfo endpoint
       */
      userinfo_endpoint?: string | null;
    }
  }
}

export interface SSOConnectionRetrieveParams {
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

export interface SSOConnectionUpdateParams {
  /**
   * Body param: OAuth 2.0 client ID (set to null to remove)
   */
  client_id?: string;

  /**
   * Body param: OAuth 2.0 client secret (set to null to remove)
   */
  client_secret?: string;

  /**
   * Body param: SSO provider identifier (e.g., issuer URL)
   */
  identifier?: string;

  /**
   * Body param: Protocol configuration for SSO connection
   */
  protocols?: SSOConnectionUpdateParams.Protocols | null;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export namespace SSOConnectionUpdateParams {
  /**
   * Protocol configuration for SSO connection
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    oauth2?: Protocols.Oauth2 | null;

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    openid?: Protocols.Openid | null;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    export interface Oauth2 {
      /**
       * OAuth 2.0 authorization endpoint
       */
      authorization_endpoint?: string | null;

      /**
       * Supported PKCE code challenge methods
       */
      code_challenge_methods_supported?: Array<string> | null;

      /**
       * JSON Web Key Set endpoint
       */
      jwks_uri?: string | null;

      /**
       * OAuth 2.0 registration endpoint
       */
      registration_endpoint?: string | null;

      /**
       * Supported OAuth 2.0 scopes
       */
      scopes_supported?: Array<string> | null;

      /**
       * OAuth 2.0 token endpoint
       */
      token_endpoint?: string | null;
    }

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    export interface Openid {
      /**
       * OpenID Connect UserInfo endpoint
       */
      userinfo_endpoint?: string | null;
    }
  }
}

export interface SSOConnectionDisableParams {
  /**
   * Unique request identifier specified by the originating caller and passed along
   * by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface SSOConnectionEnableParams {
  /**
   * Body param: OAuth 2.0 client ID
   */
  client_id: string;

  /**
   * Body param: SSO provider identifier (e.g., issuer URL)
   */
  identifier: string;

  /**
   * Body param: OAuth 2.0 client secret (optional, will be encrypted if provided)
   */
  client_secret?: string;

  /**
   * Body param: Protocol configuration for SSO connection
   */
  protocols?: SSOConnectionEnableParams.Protocols | null;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export namespace SSOConnectionEnableParams {
  /**
   * Protocol configuration for SSO connection
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    oauth2?: Protocols.Oauth2 | null;

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    openid?: Protocols.Openid | null;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for SSO connection
     */
    export interface Oauth2 {
      /**
       * OAuth 2.0 authorization endpoint
       */
      authorization_endpoint?: string | null;

      /**
       * Supported PKCE code challenge methods
       */
      code_challenge_methods_supported?: Array<string> | null;

      /**
       * JSON Web Key Set endpoint
       */
      jwks_uri?: string | null;

      /**
       * OAuth 2.0 registration endpoint
       */
      registration_endpoint?: string | null;

      /**
       * Supported OAuth 2.0 scopes
       */
      scopes_supported?: Array<string> | null;

      /**
       * OAuth 2.0 token endpoint
       */
      token_endpoint?: string | null;
    }

    /**
     * OpenID Connect protocol configuration for SSO connection
     */
    export interface Openid {
      /**
       * OpenID Connect UserInfo endpoint
       */
      userinfo_endpoint?: string | null;
    }
  }
}

export declare namespace SSOConnection {
  export {
    type SSOConnectionRetrieveResponse as SSOConnectionRetrieveResponse,
    type SSOConnectionUpdateResponse as SSOConnectionUpdateResponse,
    type SSOConnectionEnableResponse as SSOConnectionEnableResponse,
    type SSOConnectionRetrieveParams as SSOConnectionRetrieveParams,
    type SSOConnectionUpdateParams as SSOConnectionUpdateParams,
    type SSOConnectionDisableParams as SSOConnectionDisableParams,
    type SSOConnectionEnableParams as SSOConnectionEnableParams,
  };
}
