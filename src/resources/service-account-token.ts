// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class ServiceAccountToken extends APIResource {
  /**
   * Exchange service account credentials for organization-scoped M2M token
   */
  create(
    params: ServiceAccountTokenCreateParams,
    options?: RequestOptions,
  ): APIPromise<ServiceAccountTokenCreateResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post('/service-account-token', {
      body,
      ...options,
      headers: buildHeaders([
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
    });
  }
}

/**
 * OAuth2-style token response for M2M tokens
 */
export interface ServiceAccountTokenCreateResponse {
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

export interface ServiceAccountTokenCreateParams {
  /**
   * Body param: Service account client ID
   */
  client_id: string;

  /**
   * Body param: Service account client secret
   */
  client_secret: string;

  /**
   * Body param: OAuth 2.0 grant type (must be "client_credentials")
   */
  grant_type: 'client_credentials';

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace ServiceAccountToken {
  export {
    type ServiceAccountTokenCreateResponse as ServiceAccountTokenCreateResponse,
    type ServiceAccountTokenCreateParams as ServiceAccountTokenCreateParams,
  };
}
