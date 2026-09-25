// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';

export class Users extends APIResource {}

/**
 * User's role in the organization
 */
export type OrganizationRole = 'org_admin' | 'org_member' | 'org_viewer';

/**
 * Status of organization membership
 */
export type OrganizationStatus = 'active' | 'disabled';

export interface OrganizationUser {
  /**
   * The keycard account ID
   */
  id: string;

  /**
   * The time the entity was created in utc
   */
  created_at: string;

  /**
   * User's role in the organization
   */
  role: OrganizationRole;

  /**
   * Identity provider issuer
   */
  source: string;

  /**
   * Status of organization membership
   */
  status: OrganizationStatus;

  /**
   * The time the entity was mostly recently updated in utc
   */
  updated_at: string;

  /**
   * User email address
   */
  email?: string;

  /**
   * Permissions granted to the authenticated principal for this resource. Only
   * populated when the 'expand[]=permissions' query parameter is provided. Keys are
   * resource types (e.g., "organizations"), values are objects mapping permission
   * names to boolean values indicating if the permission is granted.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };
}

export declare namespace Users {
  export {
    type OrganizationRole as OrganizationRole,
    type OrganizationStatus as OrganizationStatus,
    type OrganizationUser as OrganizationUser,
  };
}
