// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as UsersAPI from '../users/users';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Members extends APIResource {
  /**
   * Returns a paginated list of the group's members. Use cursor pagination via
   * `after`/`before`. Pass `expand[]=user` to embed each member's full user record
   * and `expand[]=total_count` to include the matching row count. Pass `query[]`
   * (repeatable, 1-255 chars) to search members by their user's email or federated
   * credential subject (substring match, OR'd across repeated values). Pass
   * `filter[id]` (repeatable, max 100) to restrict results to a known set of members
   * by user ID — mutually exclusive with `after`/`before` (returns 400 if combined).
   * When `filter[id]` is set, `limit` is ignored and the response contains every
   * requested member that exists in the group, in a single page. IDs not in the
   * group are silently omitted.
   */
  list(groupID: string, params: MemberListParams, options?: RequestOptions): APIPromise<MemberListResponse> {
    const { zoneId, ...query } = params;
    return this._client.get(path`/zones/${zoneId}/groups/${groupID}/members`, { query, ...options });
  }

  /**
   * Adds a user to a group managed in Keycard. Membership of externally synced
   * groups is not managed manually.
   */
  add(groupID: string, params: MemberAddParams, options?: RequestOptions): APIPromise<GroupMember> {
    const { zoneId, ...body } = params;
    return this._client.post(path`/zones/${zoneId}/groups/${groupID}/members`, { body, ...options });
  }

  /**
   * Removes a user from a group managed in Keycard. Membership of externally synced
   * groups is not managed manually. A member is identified by its user's ID.
   */
  remove(userID: string, params: MemberRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId, groupId } = params;
    return this._client.delete(path`/zones/${zoneId}/groups/${groupId}/members/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * A user's membership in a group
 */
export interface GroupMember {
  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * ID of the user
   */
  user_id: string;

  /**
   * An authenticated user entity
   */
  user?: UsersAPI.User;
}

/**
 * Schema for adding a user to a group
 */
export interface GroupMemberCreate {
  /**
   * ID of the user to add to the group
   */
  user_id: string;
}

export interface MemberListResponse {
  items: Array<GroupMember>;

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

export interface MemberListParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Query param: Cursor for forward pagination
   */
  after?: string;

  /**
   * Query param: Cursor for backward pagination
   */
  before?: string;

  /**
   * Query param
   */
  'expand[]'?: 'total_count' | 'user' | Array<'total_count' | 'user'>;

  /**
   * Query param: Restrict results to the member with this user ID. Repeatable,
   * max 100. Mutually exclusive with after/before.
   */
  'filter[id]'?: string | Array<string>;

  /**
   * Query param: Maximum number of items to return
   */
  limit?: number;

  /**
   * Query param: Search members by their user's email or federated credential
   * subject (substring match)
   */
  'query[]'?: string | Array<string>;
}

export interface MemberAddParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Body param: ID of the user to add to the group
   */
  user_id: string;
}

export interface MemberRemoveParams {
  /**
   * Zone ID
   */
  zoneId: string;

  /**
   * Group ID
   */
  groupId: string;
}

export declare namespace Members {
  export {
    type GroupMember as GroupMember,
    type GroupMemberCreate as GroupMemberCreate,
    type MemberListResponse as MemberListResponse,
    type MemberListParams as MemberListParams,
    type MemberAddParams as MemberAddParams,
    type MemberRemoveParams as MemberRemoveParams,
  };
}
