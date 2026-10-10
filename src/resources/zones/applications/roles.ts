// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as UsersRolesAPI from '../users/roles';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Roles extends APIResource {
  /**
   * Returns the roles assigned to the specified application within the zone. The
   * full result set is currently returned in a single page; the
   * `after`/`before`/`limit` cursor parameters are reserved and not yet enforced,
   * and `pagination` cursors are always null.
   */
  list(
    applicationID: string,
    params: RoleListParams,
    options?: RequestOptions,
  ): APIPromise<RoleListResponse> {
    const { zoneId, ...query } = params;
    return this._client.get(path`/zones/${zoneId}/applications/${applicationID}/roles`, {
      query,
      ...options,
    });
  }

  /**
   * Assigns a role to the application. Provide exactly one of role_id or
   * role_identifier; when role_identifier is used, owner_type is required to
   * disambiguate roles that share an identifier across owner types (and must be
   * omitted with role_id). An optional (scope_type, scope_id) pair scopes the grant;
   * only platform roles on the org zone may carry a scope, and a `zone` scope must
   * reference a different zone in the same organization.
   */
  assign(
    applicationID: string,
    params: RoleAssignParams,
    options?: RequestOptions,
  ): APIPromise<UsersRolesAPI.RoleAssignment> {
    const { zoneId, ...body } = params;
    return this._client.post(path`/zones/${zoneId}/applications/${applicationID}/roles`, {
      body,
      ...options,
    });
  }

  /**
   * Revokes a role from the application. Provide the same (scope_type, scope_id)
   * pair the grant was created with, or omit both to revoke the unscoped grant.
   */
  revoke(roleID: string, params: RoleRevokeParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId, applicationId, scope_id, scope_type } = params;
    return this._client.delete(path`/zones/${zoneId}/applications/${applicationId}/roles/${roleID}`, {
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
   * Query param: Maximum number of items to return
   */
  limit?: number;
}

export interface RoleAssignParams {
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

export interface RoleRevokeParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Path param: Application ID
   */
  applicationId: string;

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
    type RoleAssignParams as RoleAssignParams,
    type RoleRevokeParams as RoleRevokeParams,
  };
}
