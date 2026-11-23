// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as OrganizationsAPI from './organizations';
import * as UsersAPI from './users';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Invitations extends APIResource {
  /**
   * Create an invitation to join an organization and queue the invitation email. The
   * invitation is created even when the email service cannot be reached; the
   * response's `delivery_status` is `failed` then, no email was queued, and the
   * caller must resend. A 4xx from the email service, such as a recipient send cap,
   * creates no invitation.
   */
  create(
    organizationID: string,
    params: InvitationCreateParams,
    options?: RequestOptions,
  ): APIPromise<Invitation> {
    const { 'X-Client-Request-ID': xClientRequestID, ...body } = params;
    return this._client.post(path`/organizations/${organizationID}/invitations`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * List invitations for an organization
   */
  list(
    organizationID: string,
    params: InvitationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InvitationListResponse> {
    const { 'X-Client-Request-ID': xClientRequestID, ...query } = params ?? {};
    return this._client.get(path`/organizations/${organizationID}/invitations`, {
      query,
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete an invitation
   */
  delete(invitationID: string, params: InvitationDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.delete(path`/organizations/${organization_id}/invitations/${invitationID}`, {
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
   * Send a fresh invitation email. The invitation token is rotated, so the link in
   * any earlier email stops working. Returns 409 while a previous email is still
   * queued or sending, or when the invitation is no longer pending. Returns 200 even
   * when the email service cannot be reached: the token has already been rotated,
   * the response's `delivery_status` is `failed`, no new email was queued, and the
   * caller must resend. Each resend counts toward the organization's daily
   * invitation limit. Returns 429 with a `Retry-After` header when that limit or the
   * per-recipient send cap is reached. If the email service rejects the send, the
   * earlier link keeps working.
   *
   * After the organization access check succeeds, the service sends
   * `X-Should-Retry: false` on 409, 429, and 5xx responses to tell SDKs to surface
   * the error without retrying. A retry can rotate the token and invalidate an email
   * link, including when the first send succeeded but the response did not reach the
   * caller.
   */
  resend(
    invitationID: string,
    params: InvitationResendParams,
    options?: RequestOptions,
  ): APIPromise<Invitation> {
    const { organization_id, 'X-Client-Request-ID': xClientRequestID } = params;
    return this._client.post(path`/organizations/${organization_id}/invitations/${invitationID}/resend`, {
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface Invitation {
  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * ID of the user who created the invitation
   */
  created_by: string;

  /**
   * Email address for the invitation
   */
  email: string;

  /**
   * When the invitation expires
   */
  expires_at: string;

  /**
   * Identifier for API resources. A 26-char nanoid (URL/DNS safe).
   */
  organization_id: string;

  /**
   * Role that will be assigned when invitation is accepted
   */
  role: UsersAPI.OrganizationRole;

  /**
   * Status of an invitation
   */
  status: InvitationStatus;

  /**
   * The time the entity was mostly recently updated in utc
   */
  updated_at: string;

  /**
   * Kind of bounce when `delivery_outcome` is `bounced`. `permanent` means the
   * address does not accept mail; the provider suppresses later sends to it until it
   * is removed from the suppression list. `transient` means a temporary rejection,
   * such as a full mailbox. `undetermined` means the provider could not tell.
   */
  bounce_type?: 'permanent' | 'transient' | 'undetermined';

  /**
   * What happened to the most recent invitation email after the provider accepted it
   * (`delivery_status` is `sent`). `delayed` means the recipient's server has not
   * accepted it yet. `delivered` means the recipient's server accepted it. `failed`
   * means the provider could not send it. `suppressed` means the provider did not
   * send it because the address bounced or complained before. `bounced` means the
   * recipient's server rejected it; see `bounce_type`. `complained` means the
   * recipient marked it as spam. Absent until an outcome is known, and for
   * invitations sent before outcomes were tracked. Cleared on resend. `delivered`
   * can later change to `complained` within the 24 hours the outcome is tracked.
   */
  delivery_outcome?: 'delayed' | 'delivered' | 'failed' | 'suppressed' | 'bounced' | 'complained';

  /**
   * Delivery state of the most recent invitation email. `queued` and `sending` mean
   * the email service still holds the message. `sent` means the provider accepted
   * it. `failed` means the email service could not be reached or rejected the
   * message. `expired` means the invitation expired before the message was
   * delivered. Absent for invitations created before delivery tracking existed.
   */
  delivery_status?: 'queued' | 'sending' | 'sent' | 'failed' | 'expired';

  /**
   * When `delivery_outcome` last changed in the email service.
   */
  delivery_updated_at?: string;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

/**
 * Status of an invitation
 */
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'revoked';

export interface InvitationListResponse {
  items: Array<Invitation>;

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

export interface InvitationCreateParams {
  /**
   * Body param: Email address to invite
   */
  email: string;

  /**
   * Body param: Role to assign when invitation is accepted
   */
  role: UsersAPI.OrganizationRole;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface InvitationListParams {
  /**
   * Query param: Cursor for forward pagination
   */
  after?: string;

  /**
   * Query param: Cursor for backward pagination
   */
  before?: string;

  /**
   * Query param: Fields to expand in the response. Supports "permissions" to include
   * the permissions field with the caller's permissions for the resource. For the
   * service account and service account credential list operations, "total_count"
   * populates pagination.total_count with the number of items matching the same
   * filters as the list (excluding cursor and limit). Other operations ignore expand
   * values they do not use.
   */
  'expand[]'?: 'permissions' | 'total_count' | Array<'permissions' | 'total_count'>;

  /**
   * Query param: Return only invitations with these statuses. Repeat the parameter
   * to match any of several statuses
   * (`?filter[status]=pending&filter[status]=accepted`). Expired invitations are
   * never listed, so `expired` matches nothing. When absent, no status filter is
   * applied.
   */
  'filter[status]'?: Array<InvitationStatus>;

  /**
   * Query param: Maximum number of invitations to return
   */
  limit?: number;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface InvitationDeleteParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface InvitationResendParams {
  /**
   * Path param: Organization ID or label identifier
   */
  organization_id: string;

  /**
   * Header param: Unique request identifier specified by the originating caller and
   * passed along by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace Invitations {
  export {
    type Invitation as Invitation,
    type InvitationStatus as InvitationStatus,
    type InvitationListResponse as InvitationListResponse,
    type InvitationCreateParams as InvitationCreateParams,
    type InvitationListParams as InvitationListParams,
    type InvitationDeleteParams as InvitationDeleteParams,
    type InvitationResendParams as InvitationResendParams,
  };
}
