// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Secrets extends APIResource {
  create(zoneID: string, params: SecretCreateParams, options?: RequestOptions): APIPromise<Secret> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params
    return this._client.post(path`/zones/${zoneID}/secrets`, { body, ...options, headers: buildHeaders([{...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined)}, options?.headers]) });
  }

  retrieve(id: string, params: SecretRetrieveParams, options?: RequestOptions): APIPromise<SecretRetrieveResponse> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID } = params
    return this._client.get(path`/zones/${zone_id}/secrets/${id}`, { ...options, headers: buildHeaders([{...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined)}, options?.headers]) });
  }

  update(id: string, params: SecretUpdateParams, options?: RequestOptions): APIPromise<Secret> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID, ...body } = params
    return this._client.patch(path`/zones/${zone_id}/secrets/${id}`, { body, ...options, headers: buildHeaders([{...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined)}, options?.headers]) });
  }

  list(zoneID: string, params: SecretListParams | null | undefined = {}, options?: RequestOptions): APIPromise<SecretListResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {}
    return this._client.get(path`/zones/${zoneID}/secrets`, { query, ...options, headers: buildHeaders([{...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined)}, options?.headers]) });
  }

  delete(id: string, params: SecretDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zone_id, 'X-Client-Request-ID': xClientRequestID } = params
    return this._client.delete(path`/zones/${zone_id}/secrets/${id}`, { ...options, headers: buildHeaders([{Accept: '*/*', ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined)}, options?.headers]) });
  }
}

export interface Secret {
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

export interface SecretPasswordFields {
  password: string;

  type: 'password';

  username: string;
}

export interface SecretTokenFields {
  token: string;

  type: 'token';
}

export interface SecretRetrieveResponse {
  /**
   * A globally unique opaque identifier
   */
  id: string;

  created_at: string;

  data: SecretTokenFields | SecretPasswordFields;

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

export type SecretListResponse = Array<Secret>

export interface SecretCreateParams {
  /**
   * Body param
   */
  data: SecretTokenFields | SecretPasswordFields;

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
   * Body param: Optional zone ID. This field is provided for API compatibility but
   * is ignored during processing. The zone ID is derived from the path parameter
   * (/zones/{zone_id}/secrets) and takes precedence.
   */
  zone_id?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
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
  data?: SecretTokenFields | SecretPasswordFields;

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
    type Secret as Secret,
    type SecretPasswordFields as SecretPasswordFields,
    type SecretTokenFields as SecretTokenFields,
    type SecretRetrieveResponse as SecretRetrieveResponse,
    type SecretListResponse as SecretListResponse,
    type SecretCreateParams as SecretCreateParams,
    type SecretRetrieveParams as SecretRetrieveParams,
    type SecretUpdateParams as SecretUpdateParams,
    type SecretListParams as SecretListParams,
    type SecretDeleteParams as SecretDeleteParams
  };
}
