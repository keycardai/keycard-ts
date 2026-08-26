// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as MembersAPI from './members';
import {
  GroupMember,
  GroupMemberCreate,
  MemberAddParams,
  MemberListParams,
  MemberListResponse,
  MemberRemoveParams,
  Members,
} from './members';
import * as RolesAPI from './roles';
import { RoleAddParams, RoleListParams, RoleListResponse, RoleRemoveParams, Roles } from './roles';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Groups extends APIResource {
  members: MembersAPI.Members = new MembersAPI.Members(this._client);
  roles: RolesAPI.Roles = new RolesAPI.Roles(this._client);

  /**
   * Creates a group in the zone (managed in Keycard). Groups synced from an external
   * directory are created by that directory, not here.
   */
  create(zoneID: string, body: GroupCreateParams, options?: RequestOptions): APIPromise<Group> {
    return this._client.post(path`/zones/${zoneID}/groups`, { body, ...options });
  }

  /**
   * Returns a group by ID. Pass `expand[]=member_count` for its member count and
   * `expand[]=roles` for the identifiers of its assigned roles.
   */
  retrieve(groupID: string, params: GroupRetrieveParams, options?: RequestOptions): APIPromise<Group> {
    const { zoneId, ...query } = params;
    return this._client.get(path`/zones/${zoneId}/groups/${groupID}`, { query, ...options });
  }

  /**
   * Updates a group's name and/or identifier (partial update). A group's source is
   * immutable. The name of a group synced from an external directory cannot be
   * changed while external sync is enabled for the zone; its identifier can.
   */
  update(groupID: string, params: GroupUpdateParams, options?: RequestOptions): APIPromise<Group> {
    const { zoneId, ...body } = params;
    return this._client.patch(path`/zones/${zoneId}/groups/${groupID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of the groups in the specified zone. Use cursor
   * pagination via `after`/`before`. Sort: comma-separated field list; prefix with
   * `-` for descending (allowed: created_at, name, identifier). Pass
   * `expand[]=member_count` to include each group's member count, `expand[]=roles`
   * to include the identifiers of the roles assigned to each group, and
   * `expand[]=total_count` to include the matching row count. Filter by exact
   * identifier via `filter[identifier]` (repeatable, OR'd across values). Search via
   * `query[]` (case-insensitive substring match, OR'd across repeated values); it
   * matches the group's name and identifier. Pass `filter[id]` (repeatable, max 100)
   * to restrict results to a known set of groups — mutually exclusive with
   * `after`/`before` (returns 400 if combined). When `filter[id]` is set, `limit` is
   * ignored and the response contains every requested group that exists in the zone,
   * in a single page. IDs not in the zone are silently omitted.
   */
  list(
    zoneID: string,
    query: GroupListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GroupListResponse> {
    return this._client.get(path`/zones/${zoneID}/groups`, { query, ...options });
  }

  /**
   * Deletes a group and its memberships and role assignments. Groups synced from an
   * external directory can only be deleted by that directory (after external sync is
   * disabled).
   */
  delete(groupID: string, params: GroupDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/groups/${groupID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * A zone-scoped group of users, assignable to roles and usable in policies. Roles
 * assigned to a group are inherited by its members. `external` is false for groups
 * managed in Keycard and true for groups synced from an external directory.
 */
export interface Group {
  /**
   * Unique identifier of the group
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * Whether the group is synced from an external directory. When true the group is
   * directory-owned and its membership is read-only; when false it is managed in
   * Keycard. Read-only: set by external sync, never by the caller.
   */
  external: boolean;

  /**
   * User-specified identifier, unique within the zone. Automatically assigned for
   * groups from an external directory.
   */
  identifier: string;

  /**
   * Human-readable group name
   */
  name: string;

  /**
   * Organization this group belongs to
   */
  organization_id: string;

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Zone this group belongs to
   */
  zone_id: string;

  /**
   * Number of users in the group. Included only when requested via
   * `expand[]=member_count` (group get or list).
   */
  member_count?: number;

  /**
   * Identifiers of the roles assigned to the group; members inherit them. Deduped
   * across scopes. Included only when requested via `expand[]=roles` (group get or
   * list).
   */
  roles?: Array<string>;
}

/**
 * Schema for creating a group in Keycard. Groups synced from an external directory
 * are created by that directory, not through this endpoint.
 */
export interface GroupCreate {
  /**
   * Human-readable group name
   */
  name: string;

  /**
   * User-specified identifier, unique within the zone. Derived from the name when
   * omitted (a suffix is appended if it collides).
   */
  identifier?: string;
}

/**
 * Schema for updating a group.
 */
export interface GroupUpdate {
  /**
   * User-specified identifier, unique within the zone.
   */
  identifier?: string;

  /**
   * Human-readable group name
   */
  name?: string;
}

export interface GroupListResponse {
  items: Array<Group>;

  /**
   * Cursor-based pagination metadata
   */
  pagination: GroupListResponse.Pagination;
}

export namespace GroupListResponse {
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

export interface GroupCreateParams {
  /**
   * Human-readable group name
   */
  name: string;

  /**
   * User-specified identifier, unique within the zone. Derived from the name when
   * omitted (a suffix is appended if it collides).
   */
  identifier?: string;
}

export interface GroupRetrieveParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Query param
   */
  'expand[]'?: 'member_count' | 'roles' | Array<'member_count' | 'roles'>;
}

export interface GroupUpdateParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Body param: User-specified identifier, unique within the zone.
   */
  identifier?: string;

  /**
   * Body param: Human-readable group name
   */
  name?: string;
}

export interface GroupListParams {
  /**
   * Cursor for forward pagination
   */
  after?: string;

  /**
   * Cursor for backward pagination
   */
  before?: string;

  'expand[]'?: 'total_count' | 'member_count' | 'roles' | Array<'total_count' | 'member_count' | 'roles'>;

  /**
   * Restrict results to groups with this ID. Repeatable, max 100. Mutually exclusive
   * with after/before.
   */
  'filter[id]'?: string | Array<string>;

  /**
   * Filter by exact group identifier
   */
  'filter[identifier]'?: string | Array<string>;

  /**
   * Maximum number of items to return
   */
  limit?: number;

  /**
   * Search across name and identifier (substring match)
   */
  'query[]'?: string | Array<string>;

  /**
   * Comma-separated sort fields. Prefix with - for descending. Allowed: created_at,
   * name, identifier
   */
  sort?: string;
}

export interface GroupDeleteParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

Groups.Members = Members;
Groups.Roles = Roles;

export declare namespace Groups {
  export {
    type Group as Group,
    type GroupCreate as GroupCreate,
    type GroupUpdate as GroupUpdate,
    type GroupListResponse as GroupListResponse,
    type GroupCreateParams as GroupCreateParams,
    type GroupRetrieveParams as GroupRetrieveParams,
    type GroupUpdateParams as GroupUpdateParams,
    type GroupListParams as GroupListParams,
    type GroupDeleteParams as GroupDeleteParams,
  };

  export {
    Members as Members,
    type GroupMember as GroupMember,
    type GroupMemberCreate as GroupMemberCreate,
    type MemberListResponse as MemberListResponse,
    type MemberListParams as MemberListParams,
    type MemberAddParams as MemberAddParams,
    type MemberRemoveParams as MemberRemoveParams,
  };

  export {
    Roles as Roles,
    type RoleListResponse as RoleListResponse,
    type RoleListParams as RoleListParams,
    type RoleAddParams as RoleAddParams,
    type RoleRemoveParams as RoleRemoveParams,
  };
}
