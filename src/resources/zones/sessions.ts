// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as UserAgentsAPI from './user-agents';
import * as UsersAPI from './users';
import * as ApplicationsAPI from './applications/applications';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Sessions extends APIResource {
  /**
   * Returns details of a specific session by session ID
   */
  retrieve(id: string, params: SessionRetrieveParams, options?: RequestOptions): APIPromise<Session> {
    const { zoneId } = params;
    return this._client.get(path`/zones/${zoneId}/sessions/${id}`, { ...options, __security: {} });
  }

  /**
   * Revokes an active session
   */
  update(id: string, params: SessionUpdateParams, options?: RequestOptions): APIPromise<Session> {
    const { zoneId, ...body } = params;
    return this._client.patch(path`/zones/${zoneId}/sessions/${id}`, { body, ...options, __security: {} });
  }

  /**
   * Returns entry sessions in the specified zone. Entry sessions are app user
   * sessions with an initiator that are roots or direct children of a root user
   * session. Can be filtered by session type, status, and user.
   */
  list(
    zoneID: string,
    query: SessionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SessionListResponse> {
    return this._client.get(path`/zones/${zoneID}/sessions`, { query, ...options, __security: {} });
  }

  /**
   * Permanently deletes a session, effectively logging out the user or application
   */
  delete(id: string, params: SessionDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/sessions/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }
}

/**
 * An authenticated identity session. Sessions can be user sessions (representing
 * end-user authentication) or application sessions (representing
 * service-to-service authentication). User sessions support hierarchical
 * relationships via parent_id, while application sessions are always standalone.
 */
export type Session = Session.IamUserSessionType | Session.IamApplicationSessionType;

export namespace Session {
  /**
   * User session type-specific fields
   */
  export interface IamUserSessionType {
    session_type: 'user';

    /**
     * User ID
     */
    user_id: string;

    /**
     * Session ID
     */
    id?: string;

    /**
     * @deprecated Whether the session is currently active (deprecated - use status
     * instead)
     */
    active?: boolean;

    /**
     * @deprecated An Application is a software system with an associated identity that
     * can access Resources. It may act on its own behalf (machine-to-machine) or on
     * behalf of a user (delegated access).
     */
    application?: ApplicationsAPI.Application;

    /**
     * Application ID that initiated this session
     */
    application_id?: string;

    /**
     * Date when the session was authenticated
     */
    authenticated_at?: string;

    /**
     * Entity creation timestamp
     */
    created_at?: string;

    /**
     * Date when session expires
     */
    expires_at?: string;

    /**
     * Issuer URL from IdP
     */
    issuer?: string;

    /**
     * Session metadata
     */
    metadata?: IamUserSessionType.Metadata;

    /**
     * Organization that owns this session
     */
    organization_id?: string;

    /**
     * Parent session ID for hierarchical sessions (user sessions only). When null,
     * this is a web session - a top-level session initiated directly by a user. When
     * set, this is a child session derived from the parent, used for token refresh or
     * delegation. Application sessions cannot have parents.
     */
    parent_id?: string;

    /**
     * Provider ID
     */
    provider_id?: string;

    /**
     * Session claims data (ID token claims for users, application claims for
     * applications)
     */
    session_data?: { [key: string]: unknown };

    status?: 'active' | 'expired' | 'revoked';

    /**
     * Subject claim from IdP
     */
    subject?: string;

    /**
     * Entity update timestamp
     */
    updated_at?: string;

    /**
     * @deprecated An authenticated user entity
     */
    user?: UsersAPI.User;

    /**
     * @deprecated A User Agent represents a user agent (browser, desktop app, CLI
     * tool) that can initiate user sessions via OAuth 2.0 Dynamic Client Registration.
     */
    user_agent?: UserAgentsAPI.UserAgent;

    /**
     * User agent ID (browser/client) that initiated this session
     */
    user_agent_id?: string;

    /**
     * Zone this session belongs to
     */
    zone_id?: string;
  }

  export namespace IamUserSessionType {
    /**
     * Session metadata
     */
    export interface Metadata {
      /**
       * Name of the initiating application or user agent
       */
      name: string;
    }
  }

  /**
   * Application session type-specific fields
   */
  export interface IamApplicationSessionType {
    /**
     * Application ID that initiated this session
     */
    application_id: string;

    session_type: 'application';

    /**
     * Session ID
     */
    id?: string;

    /**
     * @deprecated Whether the session is currently active (deprecated - use status
     * instead)
     */
    active?: boolean;

    /**
     * @deprecated An Application is a software system with an associated identity that
     * can access Resources. It may act on its own behalf (machine-to-machine) or on
     * behalf of a user (delegated access).
     */
    application?: ApplicationsAPI.Application;

    /**
     * Date when the session was authenticated
     */
    authenticated_at?: string;

    /**
     * Entity creation timestamp
     */
    created_at?: string;

    /**
     * Date when session expires
     */
    expires_at?: string;

    /**
     * Issuer URL from IdP
     */
    issuer?: string;

    /**
     * Session metadata
     */
    metadata?: IamApplicationSessionType.Metadata;

    /**
     * Organization that owns this session
     */
    organization_id?: string;

    /**
     * Parent session ID for hierarchical sessions (user sessions only). When null,
     * this is a web session - a top-level session initiated directly by a user. When
     * set, this is a child session derived from the parent, used for token refresh or
     * delegation. Application sessions cannot have parents.
     */
    parent_id?: string;

    /**
     * Provider ID
     */
    provider_id?: string;

    /**
     * Session claims data (ID token claims for users, application claims for
     * applications)
     */
    session_data?: { [key: string]: unknown };

    status?: 'active' | 'expired' | 'revoked';

    /**
     * Subject claim from IdP
     */
    subject?: string;

    /**
     * Entity update timestamp
     */
    updated_at?: string;

    /**
     * Zone this session belongs to
     */
    zone_id?: string;
  }

  export namespace IamApplicationSessionType {
    /**
     * Session metadata
     */
    export interface Metadata {
      /**
       * Name of the initiating application or user agent
       */
      name: string;
    }
  }
}

export interface SessionListResponse {
  items: Array<Session>;
}

export interface SessionRetrieveParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export interface SessionUpdateParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Body param
   */
  status: 'revoked';
}

export interface SessionListParams {
  active?: 'true';

  session_type?: 'user' | 'application';

  status?: 'active' | 'expired' | 'revoked';

  /**
   * Filter by user ID
   */
  user_id?: string;
}

export interface SessionDeleteParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export declare namespace Sessions {
  export {
    type Session as Session,
    type SessionListResponse as SessionListResponse,
    type SessionRetrieveParams as SessionRetrieveParams,
    type SessionUpdateParams as SessionUpdateParams,
    type SessionListParams as SessionListParams,
    type SessionDeleteParams as SessionDeleteParams,
  };
}
