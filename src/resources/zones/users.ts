// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
  /**
   * Returns details of a specific user by user ID
   */
  retrieve(id: string, params: UserRetrieveParams, options?: RequestOptions): APIPromise<User> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/users/${id}`, options);
  }

  /**
   * Returns a list of users in the specified zone.
   *
   * Note: cursor pagination, search, and sort are not yet enabled for all zones.
   * Where they are not enabled, the response returns all users in the zone (capped
   * at 100) in `items`, with `after_cursor` and `before_cursor` set to `null` and
   * `total_count` of `0`; `filter[email]` and `filter[identifier]` are still
   * applied, while the pagination, search, and sort parameters below are accepted
   * but ignored.
   *
   * Use cursor pagination via `after`/`before`. Sort: comma-separated field list;
   * prefix with `-` for descending. Use `expand[]=total_count` to include the
   * matching row count, `expand[]=session_count` to include per-user session counts,
   * `expand[]=grant_count` to include per-user delegated-grant counts, and
   * `expand[]=role-assignments` to include each user's structured role grants.
   * Filter by exact email via `filter[email]` and by exact identifier via
   * `filter[identifier]`; search via `query[email]` / `query[subject]` / `query[]`
   * (substring match, OR'd across repeated values). `query[]` matches against email
   * and federation credential subject. Pass `filter[id]` (repeatable, max 100) to
   * restrict results to a known set of users — mutually exclusive with
   * `after`/`before` (returns 400 if combined). When `filter[id]` is set, `limit` is
   * ignored and the response contains every requested user that exists in the zone,
   * in a single page. IDs not in the zone are silently omitted.
   */
  list(
    zoneID: string,
    query: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserListResponse> {
    return this._client.get(path`/zones/${zoneID}/users`, { query, ...options });
  }
}

/**
 * An authenticated user entity
 */
export interface User {
  /**
   * Unique identifier of the user
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * Email address of the user
   */
  email: string;

  /**
   * Whether the email address has been verified
   */
  email_verified: boolean;

  /**
   * Zone-scoped user identifier. Defaults to the user's Keycard ID. When the
   * provider has user_identifier_claim configured, the value is set from that claim
   * at user creation time.
   */
  identifier: string;

  /**
   * Organization that owns this user
   */
  organization_id: string;

  /**
   * Status of the user. Disabled users cannot authenticate.
   */
  status: 'active' | 'disabled';

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Zone this user belongs to
   */
  zone_id: string;

  /**
   * Date when the user was last authenticated
   */
  authenticated_at?: string;

  /**
   * Delegated-grant count for this user. Populated only when `expand[]=grant_count`
   * is set on the listing endpoint.
   */
  grant_count?: number;

  /**
   * Issuer identifier of the identity provider
   */
  issuer?: string;

  /**
   * Reference to the identity provider. This field is undefined when the source
   * identity provider is deleted but the user is not deleted.
   */
  provider_id?: string;

  /**
   * Role grants for this user within the zone. Populated only when
   * `expand[]=role-assignments` is set on the listing endpoint.
   */
  role_assignments?: Array<User.RoleAssignment>;

  /**
   * Session count for this user. Populated only when `expand[]=session_count` is set
   * on the listing endpoint.
   */
  session_count?: number;

  /**
   * Subject identifier from the identity provider
   */
  subject?: string;
}

export namespace User {
  /**
   * A role granted to a user within a zone.
   */
  export interface RoleAssignment {
    /**
     * ID of the assigned role
     */
    role_id: string;

    /**
     * Opaque role identifier. Treated as an opaque identifier by the API and unique
     * within a zone.
     */
    role_identifier: string;

    /**
     * The resource this grant is scoped to, or null when the grant is unscoped
     * (applies to the owning zone itself).
     */
    scope: RoleAssignment.Scope | null;
  }

  export namespace RoleAssignment {
    /**
     * The resource this grant is scoped to, or null when the grant is unscoped
     * (applies to the owning zone itself).
     */
    export interface Scope {
      /**
       * The ID of the scoped resource.
       */
      id: string;

      /**
       * The kind of resource this grant is scoped to (e.g. `zone`).
       */
      type: string;
    }
  }
}

export interface UserListResponse {
  items: Array<User>;

  /**
   * Cursor-based pagination metadata
   */
  pagination: UserListResponse.Pagination;
}

export namespace UserListResponse {
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

export interface UserRetrieveParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export interface UserListParams {
  /**
   * Cursor for forward pagination
   */
  after?: string;

  /**
   * Cursor for backward pagination
   */
  before?: string;

  'expand[]'?:
    | 'total_count'
    | 'session_count'
    | 'grant_count'
    | 'role-assignments'
    | Array<'total_count' | 'session_count' | 'grant_count' | 'role-assignments'>;

  /**
   * Filter by exact email address
   */
  'filter[email]'?: string | Array<string>;

  /**
   * Restrict results to users with this publicId. Repeatable, max 100. Mutually
   * exclusive with after/before.
   */
  'filter[id]'?: string | Array<string>;

  /**
   * Filter by exact user identifier
   */
  'filter[identifier]'?: string | Array<string>;

  /**
   * Maximum number of items to return
   */
  limit?: number;

  /**
   * Search across email and credential subject (substring match)
   */
  'query[]'?: string | Array<string>;

  /**
   * Search by email (substring match)
   */
  'query[email]'?: string | Array<string>;

  /**
   * Search by federated credential subject (substring match)
   */
  'query[subject]'?: string | Array<string>;

  /**
   * Comma-separated sort fields. Prefix with - for descending. Allowed: created_at,
   * email, authenticated_at
   */
  sort?: string;
}

export declare namespace Users {
  export {
    type User as User,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
    type UserListParams as UserListParams,
  };
}
