// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Secrets extends APIResource {
  create(
    zoneID: string,
    params: SecretCreateParams,
    options?: RequestOptions,
  ): APIPromise<SecretCreateResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/zones/${zoneID}/secrets`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  retrieve(
    id: string,
    params: SecretRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<SecretRetrieveResponse> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.get(path`/zones/${zone_id}/secrets/${id}`, {
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  update(id: string, params: SecretUpdateParams, options?: RequestOptions): APIPromise<SecretUpdateResponse> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.patch(path`/zones/${zone_id}/secrets/${id}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  list(
    zoneID: string,
    params: SecretListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SecretListResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/zones/${zoneID}/secrets`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  delete(id: string, params: SecretDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/zones/${zone_id}/secrets/${id}`, {
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

export interface SecretCreateResponse {
  /**
   * A globally unique opaque identifier
   */
  id: string;

  created_at: string;

  /**
   * A globally unique opaque identifier
   */
  entity_id: string;

  /**
   * A name for the entity to be displayed in UI
   */
  name: string;

  type: 'token' | 'password';

  updated_at: string;

  version: number;

  /**
   * A globally unique opaque identifier
   */
  zone_id: string;

  /**
   * A description of the entity
   */
  description?: string;

  /**
   * A JSON object containing arbitrary metadata. Metadata will not be encrypted.
   */
  metadata?: unknown;
}

export interface SecretRetrieveResponse {
  /**
   * A globally unique opaque identifier
   */
  id: string;

  created_at: string;

  data:
    | SecretRetrieveResponse.VaultAPISecretTokenFields
    | SecretRetrieveResponse.VaultAPISecretPasswordFields;

  /**
   * A globally unique opaque identifier
   */
  entity_id: string;

  /**
   * A name for the entity to be displayed in UI
   */
  name: string;

  updated_at: string;

  version: number;

  /**
   * A globally unique opaque identifier
   */
  zone_id: string;

  /**
   * A description of the entity
   */
  description?: string;

  /**
   * A JSON object containing arbitrary metadata. Metadata will not be encrypted.
   */
  metadata?: unknown;
}

export namespace SecretRetrieveResponse {
  export interface VaultAPISecretTokenFields {
    token: string;

    type: 'token';
  }

  export interface VaultAPISecretPasswordFields {
    password: string;

    type: 'password';

    username: string;
  }
}

export interface SecretUpdateResponse {
  /**
   * A globally unique opaque identifier
   */
  id: string;

  created_at: string;

  /**
   * A globally unique opaque identifier
   */
  entity_id: string;

  /**
   * A name for the entity to be displayed in UI
   */
  name: string;

  type: 'token' | 'password';

  updated_at: string;

  version: number;

  /**
   * A globally unique opaque identifier
   */
  zone_id: string;

  /**
   * A description of the entity
   */
  description?: string;

  /**
   * A JSON object containing arbitrary metadata. Metadata will not be encrypted.
   */
  metadata?: unknown;
}

export type SecretListResponse = Array<SecretListResponse.SecretListResponseItem>;

export namespace SecretListResponse {
  export interface SecretListResponseItem {
    /**
     * A globally unique opaque identifier
     */
    id: string;

    created_at: string;

    /**
     * A globally unique opaque identifier
     */
    entity_id: string;

    /**
     * A name for the entity to be displayed in UI
     */
    name: string;

    type: 'token' | 'password';

    updated_at: string;

    version: number;

    /**
     * A globally unique opaque identifier
     */
    zone_id: string;

    /**
     * A description of the entity
     */
    description?: string;

    /**
     * A JSON object containing arbitrary metadata. Metadata will not be encrypted.
     */
    metadata?: unknown;
  }
}

export interface SecretCreateParams {
  /**
   * Body param
   */
  data: SecretCreateParams.VaultAPISecretTokenFields | SecretCreateParams.VaultAPISecretPasswordFields;

  /**
   * Body param: A globally unique opaque identifier
   */
  entity_id: string;

  /**
   * Body param: A name for the entity to be displayed in UI
   */
  name: string;

  /**
   * Body param: A description of the entity
   */
  description?: string;

  /**
   * Body param: A JSON object containing arbitrary metadata. Metadata will not be
   * encrypted.
   */
  metadata?: unknown;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export namespace SecretCreateParams {
  export interface VaultAPISecretTokenFields {
    token: string;

    type: 'token';
  }

  export interface VaultAPISecretPasswordFields {
    password: string;

    type: 'password';

    username: string;
  }
}

export interface SecretRetrieveParams {
  /**
   * Path param: A globally unique opaque identifier
   */
  zone_id: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface SecretUpdateParams {
  /**
   * Path param: A globally unique opaque identifier
   */
  zone_id: string;

  /**
   * Body param
   */
  data?: SecretUpdateParams.VaultAPISecretTokenFields | SecretUpdateParams.VaultAPISecretPasswordFields;

  /**
   * Body param: A description of the entity
   */
  description?: string;

  /**
   * Body param: A JSON object containing arbitrary metadata. Metadata will not be
   * encrypted.
   */
  metadata?: unknown;

  /**
   * Body param: A name for the entity to be displayed in UI
   */
  name?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export namespace SecretUpdateParams {
  export interface VaultAPISecretTokenFields {
    token: string;

    type: 'token';
  }

  export interface VaultAPISecretPasswordFields {
    password: string;

    type: 'password';

    username: string;
  }
}

export interface SecretListParams {
  /**
   * Query param: The entity to list all secrets for
   */
  entity_id?: string;

  /**
   * Query param: The type of secrets to list
   */
  type?: 'token' | 'password';

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface SecretDeleteParams {
  /**
   * Path param: A globally unique opaque identifier
   */
  zone_id: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace Secrets {
  export {
    type SecretCreateResponse as SecretCreateResponse,
    type SecretRetrieveResponse as SecretRetrieveResponse,
    type SecretUpdateResponse as SecretUpdateResponse,
    type SecretListResponse as SecretListResponse,
    type SecretCreateParams as SecretCreateParams,
    type SecretRetrieveParams as SecretRetrieveParams,
    type SecretUpdateParams as SecretUpdateParams,
    type SecretListParams as SecretListParams,
    type SecretDeleteParams as SecretDeleteParams,
  };
}
