// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class UserAgents extends APIResource {
  /**
   * Returns details of a specific user agent by user agent ID
   */
  retrieve(id: string, params: UserAgentRetrieveParams, options?: RequestOptions): APIPromise<UserAgent> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/user-agents/${id}`, options);
  }

  /**
   * Returns a list of user agents in the specified zone. User agents represent
   * client software (browsers, desktop apps, CLI tools) registered via OAuth 2.0
   * Dynamic Client Registration.
   */
  list(zoneID: string, options?: RequestOptions): APIPromise<UserAgentListResponse> {
    return this._client.get(path`/zones/${zoneID}/user-agents`, options);
  }
}

/**
 * A User Agent represents a user agent (browser, desktop app, CLI tool) that can
 * initiate user sessions via OAuth 2.0 Dynamic Client Registration.
 */
export interface UserAgent {
  /**
   * Unique identifier of the user agent
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * User agent identifier (serves as OAuth client_id). Format: ua:{sha256_hash}
   */
  identifier: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * Organization that owns this user agent
   */
  organization_id: string;

  /**
   * URL-safe identifier, unique within the zone
   */
  slug: string;

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Zone this user agent belongs to
   */
  zone_id: string;
}

export interface UserAgentListResponse {
  items: Array<UserAgent>;
}

export interface UserAgentRetrieveParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export declare namespace UserAgents {
  export {
    type UserAgent as UserAgent,
    type UserAgentListResponse as UserAgentListResponse,
    type UserAgentRetrieveParams as UserAgentRetrieveParams,
  };
}
