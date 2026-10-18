// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Roles extends APIResource {
  /**
   * Creates a new customer-owned role in the specified zone. The owner_type is
   * always customer; platform roles are managed by Keycard.
   */
  create(zoneID: string, body: RoleCreateParams, options?: RequestOptions): APIPromise<Role> {
    return this._client.post(path`/zones/${zoneID}/roles`, { body, ...options });
  }

  /**
   * Returns details of a specific role by ID
   */
  retrieve(roleID: string, params: RoleRetrieveParams, options?: RequestOptions): APIPromise<Role> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/roles/${roleID}`, options);
  }

  /**
   * Updates a customer-owned role's description. The identifier is immutable, and
   * platform-owned roles cannot be modified.
   */
  update(roleID: string, params: RoleUpdateParams, options?: RequestOptions): APIPromise<Role> {
    const { zoneId, ...body } = params;
    return this._client.patch(path`/zones/${zoneId}/roles/${roleID}`, { body, ...options });
  }

  /**
   * Returns the roles defined in the specified zone. The full result set is
   * currently returned in a single page; the `after`/`before`/`limit` cursor
   * parameters are reserved and not yet enforced, and `pagination` cursors are
   * always null.
   */
  list(
    zoneID: string,
    query: RoleListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RoleListResponse> {
    return this._client.get(path`/zones/${zoneID}/roles`, { query, ...options });
  }

  /**
   * Permanently deletes a customer-owned role. Platform-owned roles cannot be
   * deleted, and a role with existing assignments returns 409.
   */
  delete(roleID: string, params: RoleDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/roles/${roleID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * A role that can be assigned to users within a zone.
 */
export interface Role {
  /**
   * Unique identifier of the role
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * Role identifier: a lowercase slug (letters and digits separated by single
   * hyphens or underscores), unique per owner type within a zone. Role identifiers
   * surface in policy evaluation, so the slug restriction keeps them unambiguous in
   * policy text.
   */
  identifier: string;

  /**
   * Who owns this role. Platform-owned roles are managed by Keycard and cannot be
   * modified or deleted via the API; customer-owned roles are user-created.
   */
  owner_type: 'platform' | 'customer';

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Zone this role belongs to
   */
  zone_id: string;

  /**
   * Human-readable description
   */
  description?: string | null;
}

/**
 * Schema for creating a new role
 */
export interface RoleCreate {
  /**
   * Role identifier: a lowercase slug (letters and digits separated by single
   * hyphens or underscores), unique per owner type within a zone. Role identifiers
   * surface in policy evaluation, so the slug restriction keeps them unambiguous in
   * policy text.
   */
  identifier: string;

  /**
   * Human-readable description
   */
  description?: string;
}

/**
 * Schema for updating an existing role. The role identifier is immutable.
 */
export interface RoleUpdate {
  /**
   * Human-readable description (set to null to unset)
   */
  description?: string | null;
}

export interface RoleListResponse {
  items: Array<Role>;

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

export interface RoleCreateParams {
  /**
   * Role identifier: a lowercase slug (letters and digits separated by single
   * hyphens or underscores), unique per owner type within a zone. Role identifiers
   * surface in policy evaluation, so the slug restriction keeps them unambiguous in
   * policy text.
   */
  identifier: string;

  /**
   * Human-readable description
   */
  description?: string;
}

export interface RoleRetrieveParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export interface RoleUpdateParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Body param: Human-readable description (set to null to unset)
   */
  description?: string | null;
}

export interface RoleListParams {
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
   * Filter roles by identifier
   */
  identifier?: string;

  /**
   * Maximum number of items to return
   */
  limit?: number;
}

export interface RoleDeleteParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export declare namespace Roles {
  export {
    type Role as Role,
    type RoleCreate as RoleCreate,
    type RoleUpdate as RoleUpdate,
    type RoleListResponse as RoleListResponse,
    type RoleCreateParams as RoleCreateParams,
    type RoleRetrieveParams as RoleRetrieveParams,
    type RoleUpdateParams as RoleUpdateParams,
    type RoleListParams as RoleListParams,
    type RoleDeleteParams as RoleDeleteParams,
  };
}
