// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as OrganizationsAPI from './organizations/organizations';
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
  ): APIPromise<OrganizationsAPI.TokenResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, 'X-Request-ID': xRequestID, ...body } = params;
    return this._client.post('/service-account-token', {
      body,
      ...options,
      headers: buildHeaders([
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
          ...(xRequestID != null ? { 'X-Request-ID': xRequestID } : undefined),
        },
        options?.headers,
      ]),
      __security: {},
    });
  }
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

  /**
   * Header param: Unique request identifier only provided if the upstream caller is
   * a Keycard service.
   */
  'X-Request-ID'?: string;
}

export declare namespace ServiceAccountToken {
  export { type ServiceAccountTokenCreateParams as ServiceAccountTokenCreateParams };
}
