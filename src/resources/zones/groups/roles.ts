// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as UsersRolesAPI from '../users/roles';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Roles extends APIResource {
  /**
   * Returns the roles assigned to the group. Members inherit these roles. Returns
   * the shared role-assignment shape with `principal_type` set to `group`. Use
   * cursor pagination via `after`/`before`; pass `expand[]=total_count` to include
   * the matching row count. Pass `filter[id]` (repeatable, max 100) to restrict
   * results to a known set of role assignments, mutually exclusive with
   * `after`/`before` (returns 400 if combined). When `filter[id]` is set, `limit` is
   * ignored and the response contains every requested assignment that exists on the
   * group, in a single page. IDs not on the group are silently omitted.
   */
  list(groupID: string, params: RoleListParams, options?: RequestOptions): APIPromise<RoleListResponse> {
    const { zoneId, ...query } = params;
    return this._client.get(path`/zones/${zoneId}/groups/${groupID}/roles`, { query, ...options });
  }

  /**
   * Assigns a role to the group; members inherit it. Provide role_id, or
   * role_identifier with owner_type. Returns the shared role-assignment shape with
   * `principal_type` set to `group`.
   */
  add(
    groupID: string,
    params: RoleAddParams,
    options?: RequestOptions,
  ): APIPromise<UsersRolesAPI.RoleAssignment> {
    const { zoneId, ...body } = params;
    return this._client.post(path`/zones/${zoneId}/groups/${groupID}/roles`, { body, ...options });
  }

  /**
   * Revokes a role from the group. Provide the same (scope_type, scope_id) pair the
   * grant was created with, or omit both to revoke the unscoped grant.
   */
  remove(roleID: string, params: RoleRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId, groupId, scope_id, scope_type } = params;
    return this._client.delete(path`/zones/${zoneId}/groups/${groupId}/roles/${roleID}`, {
      query: { scope_id, scope_type },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface RoleListResponse {
  items: Array<UsersRolesAPI.RoleAssignment>;

  /**
   * Cursor-based pagination metadata
   */
  pagination: RoleListResponse.Pagination;
}

export namespace RoleListResponse {
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

export interface RoleListParams {
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
  'expand[]'?: 'total_count' | Array<'total_count'>;

  /**
   * Query param: Restrict results to the role assignment with this ID. Repeatable,
   * max 100. Mutually exclusive with after/before.
   */
  'filter[id]'?: string | Array<string>;

  /**
   * Query param: Maximum number of items to return
   */
  limit?: number;
}

export interface RoleAddParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Body param: Owner type of the role to assign. Required with role_identifier (an
   * identifier is unique only per owner type); must be omitted with role_id.
   */
  owner_type?: 'platform' | 'customer';

  /**
   * Body param: ID of the role to assign. Provide exactly one of role_id or
   * role_identifier; owner_type must be omitted when role_id is used.
   */
  role_id?: string;

  /**
   * Body param: Role identifier: a lowercase slug (letters and digits separated by
   * single hyphens or underscores), unique per owner type within a zone. Role
   * identifiers surface in policy evaluation, so the slug restriction keeps them
   * unambiguous in policy text.
   */
  role_identifier?: string;

  /**
   * Body param: The ID of the resource to scope the grant to. Provide together with
   * scope_type, or omit both for an unscoped assignment. When scope_type is `zone`,
   * this must reference a different zone in the same organization.
   */
  scope_id?: string;

  /**
   * Body param: The kind of resource to scope the grant to (e.g. `zone`). Provide
   * together with scope_id, or omit both for an unscoped assignment (applies to the
   * owning zone itself). Only platform roles on the org zone may carry a scope.
   */
  scope_type?: string;
}

export interface RoleRemoveParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Path param: Group ID
   */
  groupId: string;

  /**
   * Query param: Scope target of the grant to revoke. Provide together with
   * scope_type.
   */
  scope_id?: string;

  /**
   * Query param: Scope kind of the grant to revoke. Provide together with scope_id.
   */
  scope_type?: string;
}

export declare namespace Roles {
  export {
    type RoleListResponse as RoleListResponse,
    type RoleListParams as RoleListParams,
    type RoleAddParams as RoleAddParams,
    type RoleRemoveParams as RoleRemoveParams,
  };
}
