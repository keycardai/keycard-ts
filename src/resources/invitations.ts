// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as OrganizationsInvitationsAPI from './organizations/invitations';
import * as UsersAPI from './organizations/users';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Invitations extends APIResource {
  /**
   * View invitation details by token without consuming the token
   */
  retrieve(
    token: string,
    params: InvitationRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InvitationRetrieveResponse> {
    const { 'X-Client-Request-ID': xClientRequestID } = params ?? {};
    return this._client.get(path`/invitations/${token}`, {
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }

  /**
   * Accept and consume an invitation token to join the organization
   */
  accept(
    token: string,
    params: InvitationAcceptParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InvitationAcceptResponse> {
    const { 'X-Client-Request-ID': xClientRequestID } = params ?? {};
    return this._client.post(path`/invitations/${token}/accept`, {
      ...options,
      headers: buildHeaders([
        { ...(xClientRequestID != null ? { 'X-Client-Request-ID': xClientRequestID } : undefined) },
        options?.headers,
      ]),
      __security: {},
    });
  }
}

/**
 * Public invitation details viewable by token
 */
export interface InvitationRetrieveResponse {
  /**
   * Name of the user who sent the invitation
   */
  created_by_name: string;

  /**
   * Email address for the invitation
   */
  email: string;

  /**
   * When the invitation expires
   */
  expires_at: string;

  /**
   * Name of the organization being invited to
   */
  organization_name: string;

  /**
   * Role that will be assigned when invitation is accepted
   */
  role: UsersAPI.OrganizationRole;

  /**
   * Status of an invitation
   */
  status: OrganizationsInvitationsAPI.InvitationStatus;
}

/**
 * Result of accepting an invitation
 */
export interface InvitationAcceptResponse {
  /**
   * ID of the organization joined
   */
  organization_id: string;

  /**
   * Name of the organization joined
   */
  organization_name: string;

  /**
   * Whether the invitation was successfully accepted
   */
  success: boolean;

  /**
   * ID of the user who accepted the invitation
   */
  user_id?: string;
}

export interface InvitationRetrieveParams {
  /**
   * Unique request identifier specified by the originating caller and passed along
   * by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export interface InvitationAcceptParams {
  /**
   * Unique request identifier specified by the originating caller and passed along
   * by proxies.
   */
  'X-Client-Request-ID'?: string;
}

export declare namespace Invitations {
  export {
    type InvitationRetrieveResponse as InvitationRetrieveResponse,
    type InvitationAcceptResponse as InvitationAcceptResponse,
    type InvitationRetrieveParams as InvitationRetrieveParams,
    type InvitationAcceptParams as InvitationAcceptParams,
  };
}
