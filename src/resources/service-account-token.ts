// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as OrganizationsAPI from './organizations/organizations';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class ServiceAccountToken extends APIResource {
  /**
   * Exchange service account credentials for an organization-scoped M2M token.
   *
   * Credentials may be provided via HTTP Basic Authentication (RFC 6749 Section
   * 2.3.1, preferred) or as form body parameters. The server MUST NOT accept
   * credentials in both locations simultaneously and will reject such requests with
   * a 400 error.
   */
  create(
    params: ServiceAccountTokenCreateParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationsAPI.TokenResponse> {
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
      __security: {},
    });
  }
}

export interface ServiceAccountTokenCreateParams {
  /**
   * Body param: OAuth 2.0 grant type (must be "client_credentials")
   */
  grant_type: 'client_credentials';

  /**
   * Body param: Service account client ID. Required if not using HTTP Basic
   * Authentication.
   */
  client_id?: string | null;

  /**
   * Body param: Service account client secret. Required if not using HTTP Basic
   * Authentication.
   */
  client_secret?: string | null;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace ServiceAccountToken {
  export { type ServiceAccountTokenCreateParams as ServiceAccountTokenCreateParams };
}
