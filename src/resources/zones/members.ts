// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ZonesAPI from './zones';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Members extends APIResource {
  /**
   * Returns detailed information about a specific organization user in a zone.
   */
  retrieve(
    organizationUserID: string,
    params: MemberRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ZoneMember> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/members/${organizationUserID}`, options);
  }

  /**
   * Updates the role of an existing zone member. Only organization administrators
   * can perform this action.
   */
  update(
    organizationUserID: string,
    params: MemberUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ZoneMember> {
    const { zoneId, ...body } = params;
    return this._client.patch(path`/zones/${zoneId}/members/${organizationUserID}`, { body, ...options });
  }

  /**
   * Lists all organization users in a zone with their roles and metadata. Supports
   * cursor-based pagination.
   */
  list(
    zoneID: string,
    query: MemberListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemberListResponse> {
    return this._client.get(path`/zones/${zoneID}/members`, { query, ...options });
  }

  /**
   * Removes an organization user's membership from a zone. Only organization
   * administrators can perform this action.
   */
  delete(organizationUserID: string, params: MemberDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/members/${organizationUserID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Adds an organization user to a zone with the specified role.
   */
  add(zoneID: string, body: MemberAddParams, options?: RequestOptions): APIPromise<ZoneMember> {
    return this._client.post(path`/zones/${zoneID}/members`, { body, ...options });
  }
}

/**
 * Represents an organization user's membership in a zone with an assigned role
 */
export interface ZoneMember {
  /**
   * Unique identifier of the zone member
   */
  id: string;

  /**
   * HAL-format hypermedia links for zone member resources
   */
  _links: ZoneMember._Links;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * Organization ID that owns the zone
   */
  organization_id: string;

  /**
   * Organization user ID of the zone member
   */
  organization_user_id: string;

  /**
   * Zone role type. zone_manager has full management access, zone_viewer has
   * read-only access.
   */
  role: ZoneRole;

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Zone ID the organization user is a member of
   */
  zone_id: string;
}

export namespace ZoneMember {
  /**
   * HAL-format hypermedia links for zone member resources
   */
  export interface _Links {
    organization_user: _Links.OrganizationUser;

    self: _Links.Self;
  }

  export namespace _Links {
    export interface OrganizationUser {
      /**
       * Link to the user resource
       */
      href: string;
    }

    export interface Self {
      /**
       * Link to this zone member resource
       */
      href: string;
    }
  }
}

/**
 * Zone role type. zone_manager has full management access, zone_viewer has
 * read-only access.
 */
export type ZoneRole = 'zone_manager' | 'zone_viewer';

export interface MemberListResponse {
  items: Array<ZoneMember>;

  /**
   * Pagination information
   */
  page_info: ZonesAPI.PageInfoPagination;

  /**
   * Cursor-based pagination metadata
   */
  pagination: MemberListResponse.Pagination;
}

export namespace MemberListResponse {
  /**
   * Cursor-based pagination metadata
   */
  export interface Pagination {
    /**
     * An opaque cursor used for paginating through a list of results
     */
    after_cursor: string | null;

    /**
     * An opaque cursor used for paginating through a list of results
     */
    before_cursor: string | null;

    /**
     * Total number of items matching the query. Only included when
     * expand[]=total_count is requested.
     */
    total_count?: number;
  }
}

export interface MemberRetrieveParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export interface MemberUpdateParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Body param: Zone role type. zone_manager has full management access, zone_viewer
   * has read-only access.
   */
  role: ZoneRole;
}

export interface MemberListParams {
  /**
   * Cursor for forward pagination
   */
  after?: string;

  /**
   * Cursor for backward pagination
   */
  before?: string;

  'expand[]'?: 'total_count' | Array<'total_count'>;

  /**
   * Maximum number of members to return
   */
  limit?: number;

  /**
   * Filter members by role
   */
  role?: 'zone_manager' | 'zone_viewer';
}

export interface MemberDeleteParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export interface MemberAddParams {
  /**
   * Organization user ID to add to the zone
   */
  organization_user_id: string;

  /**
   * Zone role type. zone_manager has full management access, zone_viewer has
   * read-only access.
   */
  role: ZoneRole;
}

export declare namespace Members {
  export {
    type ZoneMember as ZoneMember,
    type ZoneRole as ZoneRole,
    type MemberListResponse as MemberListResponse,
    type MemberRetrieveParams as MemberRetrieveParams,
    type MemberUpdateParams as MemberUpdateParams,
    type MemberListParams as MemberListParams,
    type MemberDeleteParams as MemberDeleteParams,
    type MemberAddParams as MemberAddParams,
  };
}
