// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Per-user Policy Bundle resource. Allows clients (typically the Keycard CLI)
 * to GET, PUT, and DELETE the effective Policy Set for the calling user
 * on a zone. The bundle is encoded with a content-negotiated codec (currently
 * only `application/vnd.keycard.policy-bundle.v1+tar+gzip`).
 *
 * ## Archive layout
 *
 * The bundle is a gzip-compressed tar archive with this logical layout:
 *
 * | Entry | Required on PUT | Notes |
 * |-------|-----------------|-------|
 * | `manifest.json` | **Yes** | See `PolicyBundleManifest`. The only source of the authoritative `schema.version`. |
 * | `schema.cedarschema` | No | Convenience snapshot of the Cedar schema. **Ignored on PUT** — the server validates policies against its own attested schema for `manifest.schema.version`. **Always present on GET.** |
 * | `policies/<public_id>.cedar` | — | One Cedar policy per file; the filename stem is the policy's public ID. |
 *
 * Decode rules: duplicate entries and unrecognized/nested entries are
 * rejected (`bundle_invalid`). On PUT the manifest's `sha` fields and
 * `policies[]` list are advisory — the server recomputes every digest from
 * the archived bytes and derives the policy set from the `policies/` files.
 * On GET every digest is authoritative.
 */
export class PolicyBundle extends APIResource {
  /**
   * Returns the effective Policy Bundle for the user identified by the zone-issued
   * resource-scoped token. When no user-scope binding exists, one will be generated
   * from the default set.
   *
   * The response body is a binary archive in the codec selected via the `Accept`
   * header. The only codec supported today is
   * `application/vnd.keycard.policy-bundle.v1+tar+gzip`. Clients SHOULD send an
   * explicit `Accept` header; absent one, the server defaults to the tar+gzip codec.
   *
   * Supports conditional fetch via `If-None-Match`: when the supplied ETag matches
   * the current bundle, the server responds `304 Not Modified` with no body.
   */
  retrieve(
    params: PolicyBundleRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Response> {
    const { 'If-None-Match': ifNoneMatch, 'X-Client-Request-ID': xClientRequestID } = params ?? {};
    return this._client.get('/policy/bundle', {
      ...options,
      headers: buildHeaders([
        {
          Accept: 'application/octet-stream',
          ...(ifNoneMatch != null ? { 'If-None-Match': ifNoneMatch } : undefined),
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
      __security: { bearerAuth: true },
      __binaryResponse: true,
    });
  }

  /**
   * Accepts an edited Policy Bundle archive and applies it as the active user-scope
   * PolicySetVersion for the calling user.
   *
   * The user's policy set is seeded from the system-default policies on first
   * access, forked into customer-owned policies; a user bundle therefore contains
   * only customer-owned policies. Applying an edit creates a new version of the
   * affected policy, and a `new_policy` entry adds a further customer-owned policy.
   * Platform-owned catalog policies are never edited in place by this operation.
   *
   * The request body codec is determined from `Content-Type`. The only codec
   * supported today is `application/vnd.keycard.policy-bundle.v1+tar+gzip`.
   *
   * Supports optimistic concurrency via `If-Match`: when supplied, the server
   * applies the bundle only if the supplied ETag matches the current bundle ETag;
   * otherwise responds `412 Precondition Failed`.
   *
   * On success the server returns the materialized bundle (in the same codec) and
   * its new `ETag`.
   */
  update(
    body: string | ArrayBuffer | ArrayBufferView | Blob | DataView,
    params: PolicyBundleUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Response> {
    const { 'If-Match': ifMatch, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.put('/policy/bundle', {
      body: body,
      ...options,
      headers: buildHeaders([
        {
          'Content-Type': 'application/octet-stream',
          Accept: 'application/octet-stream',
          ...(ifMatch != null ? { 'If-Match': ifMatch } : undefined),
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
      __security: { bearerAuth: true },
      __binaryResponse: true,
    });
  }

  /**
   * Archives the PolicySet for the calling user (if any), causing subsequent
   * `GET /policy/bundle` requests to fall back to the default user policies.
   * Idempotent: returns `204 No Content` even when no user-scope binding exists.
   */
  reset(params: PolicyBundleResetParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    const { 'X-Client-Request-ID': xClientRequestID } = params ?? {};
    return this._client.delete('/policy/bundle', {
      ...options,
      headers: buildHeaders([
        {
          Accept: '*/*',
          ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined),
        },
        options?.headers,
      ]),
      __security: { bearerAuth: true },
    });
  }
}

export interface PolicyBundleRetrieveParams {
  /**
   * Conditional fetch ETag. If the supplied value matches the current bundle ETag,
   * the server returns `304 Not Modified` with no body.
   */
  'If-None-Match'?: string;

  /**
   * Unique request identifier specified by the originating caller and passed along
   * by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface PolicyBundleUpdateParams {
  /**
   * Header param: Optimistic concurrency ETag. When supplied, the server applies the
   * bundle only if the value matches the current bundle ETag; otherwise responds
   * `412 Precondition Failed`.
   */
  'If-Match'?: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface PolicyBundleResetParams {
  /**
   * Unique request identifier specified by the originating caller and passed along
   * by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace PolicyBundle {
  export {
    type PolicyBundleRetrieveParams as PolicyBundleRetrieveParams,
    type PolicyBundleUpdateParams as PolicyBundleUpdateParams,
    type PolicyBundleResetParams as PolicyBundleResetParams,
  };
}
