// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ZonesAPI from './zones';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Providers extends APIResource {
  /**
   * Creates a new Provider - a system that supplies access to Resources and allows
   * actors to authenticate
   */
  create(zoneID: string, body: ProviderCreateParams, options?: RequestOptions): APIPromise<Provider> {
    return this._client.post(path`/zones/${zoneID}/providers`, { body, ...options, __security: {} });
  }

  /**
   * Returns details of a specific Provider by ID
   */
  retrieve(id: string, params: ProviderRetrieveParams, options?: RequestOptions): APIPromise<Provider> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/providers/${id}`, { ...options, __security: {} });
  }

  /**
   * Updates a Provider's configuration and metadata
   */
  update(id: string, params: ProviderUpdateParams, options?: RequestOptions): APIPromise<Provider> {
    const { zoneId, ...body } = params;
    return this._client.patch(path`/zones/${zoneId}/providers/${id}`, { body, ...options, __security: {} });
  }

  /**
   * Returns a list of providers in the specified zone
   */
  list(
    zoneID: string,
    query: ProviderListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProviderListResponse> {
    return this._client.get(path`/zones/${zoneID}/providers`, { query, ...options, __security: {} });
  }

  /**
   * Permanently deletes a provider
   */
  delete(id: string, params: ProviderDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/providers/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }
}

/**
 * A Provider is a system that supplies access to Resources and allows actors
 * (Users or Applications) to authenticate.
 */
export interface Provider {
  /**
   * Unique identifier of the provider
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * User specified identifier, unique within the zone
   */
  identifier: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * Organization that owns this provider
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
   * Zone this provider belongs to
   */
  zone_id: string;

  /**
   * OAuth 2.0 client identifier
   */
  client_id?: string | null;

  /**
   * Indicates whether a client secret is configured
   */
  client_secret_set?: boolean;

  /**
   * Human-readable description
   */
  description?: string | null;

  /**
   * Domains for identifier-first login flow. Must be globally unique across all
   * providers.
   */
  domains?: Array<string> | null;

  /**
   * Provider metadata
   */
  metadata?: Provider.Metadata | null;

  /**
   * Protocol-specific configuration
   */
  protocols?: Provider.Protocols | null;

  type?: 'external' | 'keycard-vault' | 'keycard-sts';
}

export namespace Provider {
  /**
   * Provider metadata
   */
  export interface Metadata {
    /**
     * Additional claims to inject when provider is used for zone login
     */
    internal_claims?: { [key: string]: unknown };
  }

  /**
   * Protocol-specific configuration
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration
     */
    oauth2?: Protocols.Oauth2 | null;

    /**
     * OpenID Connect protocol configuration
     */
    openid?: Protocols.Openid | null;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration
     */
    export interface Oauth2 {
      authorization_endpoint?: string | null;

      code_challenge_methods_supported?: Array<string> | null;

      jwks_uri?: string | null;

      registration_endpoint?: string | null;

      scopes_supported?: Array<string> | null;

      token_endpoint?: string | null;
    }

    /**
     * OpenID Connect protocol configuration
     */
    export interface Openid {
      userinfo_endpoint?: string | null;
    }
  }
}

export interface ProviderListResponse {
  items: Array<Provider>;

  /**
   * Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;
}

export interface ProviderCreateParams {
  /**
   * User specified identifier, unique within the zone
   */
  identifier: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * OAuth 2.0 client identifier
   */
  client_id?: string;

  /**
   * OAuth 2.0 client secret (will be encrypted and stored securely)
   */
  client_secret?: string;

  /**
   * Human-readable description
   */
  description?: string | null;

  /**
   * Domains for identifier-first login flow. Must be globally unique across all
   * providers.
   */
  domains?: Array<string>;

  /**
   * Provider metadata
   */
  metadata?: ProviderCreateParams.Metadata;

  /**
   * Protocol-specific configuration for provider creation
   */
  protocols?: ProviderCreateParams.Protocols;
}

export namespace ProviderCreateParams {
  /**
   * Provider metadata
   */
  export interface Metadata {
    /**
     * Additional claims to inject when provider is used for zone login
     */
    internal_claims?: { [key: string]: unknown };
  }

  /**
   * Protocol-specific configuration for provider creation
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for provider creation
     */
    oauth2?: Protocols.Oauth2;

    /**
     * OpenID Connect protocol configuration for provider creation
     */
    openid?: Protocols.Openid;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for provider creation
     */
    export interface Oauth2 {
      authorization_endpoint?: string;

      code_challenge_methods_supported?: Array<string>;

      jwks_uri?: string;

      registration_endpoint?: string;

      scopes_supported?: Array<string>;

      token_endpoint?: string;
    }

    /**
     * OpenID Connect protocol configuration for provider creation
     */
    export interface Openid {
      userinfo_endpoint?: string;
    }
  }
}

export interface ProviderRetrieveParams {
  zoneId: string;
}

export interface ProviderUpdateParams {
  /**
   * Path param
   */
  zoneId: string;

  /**
   * Body param: OAuth 2.0 client identifier. Set to null to remove.
   */
  client_id?: string | null;

  /**
   * Body param: OAuth 2.0 client secret (will be encrypted and stored securely). Set
   * to null to remove.
   */
  client_secret?: string | null;

  /**
   * Body param: Human-readable description
   */
  description?: string | null;

  /**
   * Body param: Domains for identifier-first login flow. Must be globally unique
   * across all providers. Set to null to remove all domains.
   */
  domains?: Array<string> | null;

  /**
   * Body param: User specified identifier, unique within the zone
   */
  identifier?: string;

  /**
   * Body param: Provider metadata. Set to null to remove all metadata.
   */
  metadata?: ProviderUpdateParams.Metadata | null;

  /**
   * Body param: Human-readable name
   */
  name?: string;

  /**
   * Body param: Protocol-specific configuration. Set to null to remove all
   * protocols.
   */
  protocols?: ProviderUpdateParams.Protocols | null;
}

export namespace ProviderUpdateParams {
  /**
   * Provider metadata. Set to null to remove all metadata.
   */
  export interface Metadata {
    /**
     * Additional claims to inject when provider is used for zone login. Set to null to
     * remove.
     */
    internal_claims?: { [key: string]: unknown } | null;
  }

  /**
   * Protocol-specific configuration. Set to null to remove all protocols.
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration. Set to null to remove all OAuth2 config.
     */
    oauth2?: Protocols.Oauth2 | null;

    /**
     * OpenID Connect protocol configuration. Set to null to remove all OpenID config.
     */
    openid?: Protocols.Openid | null;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration. Set to null to remove all OAuth2 config.
     */
    export interface Oauth2 {
      authorization_endpoint?: string | null;

      code_challenge_methods_supported?: Array<string> | null;

      jwks_uri?: string | null;

      registration_endpoint?: string | null;

      scopes_supported?: Array<string> | null;

      token_endpoint?: string | null;
    }

    /**
     * OpenID Connect protocol configuration. Set to null to remove all OpenID config.
     */
    export interface Openid {
      userinfo_endpoint?: string | null;
    }
  }
}

export interface ProviderListParams {
  cursor?: string;

  identifier?: string;

  limit?: number;

  slug?: string;

  type?: 'external' | 'keycard-vault' | 'keycard-sts';
}

export interface ProviderDeleteParams {
  zoneId: string;
}

export declare namespace Providers {
  export {
    type Provider as Provider,
    type ProviderListResponse as ProviderListResponse,
    type ProviderCreateParams as ProviderCreateParams,
    type ProviderRetrieveParams as ProviderRetrieveParams,
    type ProviderUpdateParams as ProviderUpdateParams,
    type ProviderListParams as ProviderListParams,
    type ProviderDeleteParams as ProviderDeleteParams,
  };
}
