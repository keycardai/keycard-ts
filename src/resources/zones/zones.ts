// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ApplicationCredentialsAPI from './application-credentials';
import {
  ApplicationCredentialCreateParams,
  ApplicationCredentialCreateResponse,
  ApplicationCredentialDeleteParams,
  ApplicationCredentialListParams,
  ApplicationCredentialListResponse,
  ApplicationCredentialRetrieveParams,
  ApplicationCredentialUpdateParams,
  ApplicationCredentials,
  BaseFields,
  Credential,
  Password,
  Public,
  PublicKey,
  Token,
  URL,
} from './application-credentials';
import * as DelegatedGrantsAPI from './delegated-grants';
import {
  DelegatedGrantDeleteParams,
  DelegatedGrantListParams,
  DelegatedGrantListResponse,
  DelegatedGrantRetrieveParams,
  DelegatedGrantUpdateParams,
  DelegatedGrants,
  Grant,
} from './delegated-grants';
import * as McpGatewaysAPI from './mcp-gateways';
import { McpGatewayCreateServerParams, McpGatewayCreateServerResponse, McpGateways } from './mcp-gateways';
import * as MembersAPI from './members';
import {
  MemberAddParams,
  MemberDeleteParams,
  MemberListParams,
  MemberListResponse,
  MemberRetrieveParams,
  MemberUpdateParams,
  Members,
  ZoneMember,
  ZoneRole,
} from './members';
import * as ProvidersAPI from './providers';
import {
  Provider,
  ProviderCreateParams,
  ProviderDeleteParams,
  ProviderListParams,
  ProviderListResponse,
  ProviderRetrieveParams,
  ProviderUpdateParams,
  Providers,
} from './providers';
import * as ResourcesAPI from './resources';
import {
  ResourceCreateParams,
  ResourceDeleteParams,
  ResourceListParams,
  ResourceListResponse,
  ResourceRetrieveParams,
  ResourceUpdateParams,
  Resources,
} from './resources';
import * as SecretsAPI from './secrets';
import {
  Secret,
  SecretCreateParams,
  SecretDeleteParams,
  SecretListParams,
  SecretListResponse,
  SecretPasswordFields,
  SecretRetrieveParams,
  SecretRetrieveResponse,
  SecretTokenFields,
  SecretUpdateParams,
  Secrets,
} from './secrets';
import * as SessionsAPI from './sessions';
import {
  Session,
  SessionDeleteParams,
  SessionListParams,
  SessionListResponse,
  SessionRetrieveParams,
  SessionUpdateParams,
  Sessions,
} from './sessions';
import * as UserAgentsAPI from './user-agents';
import { UserAgent, UserAgentListResponse, UserAgentRetrieveParams, UserAgents } from './user-agents';
import * as UsersAPI from './users';
import { User, UserListResponse, UserRetrieveParams, Users } from './users';
import * as ApplicationsAPI from './applications/applications';
import {
  Application,
  ApplicationCreateParams,
  ApplicationDeleteParams,
  ApplicationListCredentialsParams,
  ApplicationListCredentialsResponse,
  ApplicationListParams,
  ApplicationListResourcesParams,
  ApplicationListResourcesResponse,
  ApplicationListResponse,
  ApplicationRetrieveParams,
  ApplicationTrait,
  ApplicationUpdateParams,
  Applications,
  Metadata,
  MetadataUpdate,
} from './applications/applications';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Zones extends APIResource {
  applications: ApplicationsAPI.Applications = new ApplicationsAPI.Applications(this._client);
  applicationCredentials: ApplicationCredentialsAPI.ApplicationCredentials =
    new ApplicationCredentialsAPI.ApplicationCredentials(this._client);
  delegatedGrants: DelegatedGrantsAPI.DelegatedGrants = new DelegatedGrantsAPI.DelegatedGrants(this._client);
  mcpGateways: McpGatewaysAPI.McpGateways = new McpGatewaysAPI.McpGateways(this._client);
  providers: ProvidersAPI.Providers = new ProvidersAPI.Providers(this._client);
  resources: ResourcesAPI.Resources = new ResourcesAPI.Resources(this._client);
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);
  userAgents: UserAgentsAPI.UserAgents = new UserAgentsAPI.UserAgents(this._client);
  users: UsersAPI.Users = new UsersAPI.Users(this._client);
  members: MembersAPI.Members = new MembersAPI.Members(this._client);
  secrets: SecretsAPI.Secrets = new SecretsAPI.Secrets(this._client);

  /**
   * Creates a new zone for the authenticated organization. A zone is an isolated
   * environment for IAM resources.
   */
  create(body: ZoneCreateParams, options?: RequestOptions): APIPromise<Zone> {
    return this._client.post('/zones', { body, ...options, __security: {} });
  }

  /**
   * Returns details of a specific zone by ID
   */
  retrieve(
    zoneID: string,
    query: ZoneRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Zone> {
    return this._client.get(path`/zones/${zoneID}`, { query, ...options, __security: {} });
  }

  /**
   * Updates a zone's configuration (partial update)
   */
  update(
    zoneID: string,
    body: ZoneUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Zone> {
    return this._client.patch(path`/zones/${zoneID}`, { body, ...options, __security: {} });
  }

  /**
   * Returns a list of zones for the authenticated organization
   */
  list(
    query: ZoneListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ZoneListResponse> {
    return this._client.get('/zones', { query, ...options, __security: {} });
  }

  /**
   * Permanently deletes a zone and all its associated resources
   */
  delete(zoneID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/zones/${zoneID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }

  /**
   * Removes downstream resource, dependency, and optionally upstream
   * resource/provider
   */
  deleteMcpServer(
    downstreamID: string,
    params: ZoneDeleteMcpServerParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { zoneId } = params;
    return this._client.delete(path`/zones/${zoneId}/mcp-servers/${downstreamID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }

  /**
   * Returns aggregated access records per session-resource pair. At least one of
   * user_id, session_id, or resource_id must be provided. By default when filtering
   * by user_id, returns sessions with an initiator (application or user agent). Use
   * has_initiator=true to explicitly filter to sessions with an initiator.
   */
  listSessionResourceAccess(
    zoneID: string,
    query: ZoneListSessionResourceAccessParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ZoneListSessionResourceAccessResponse> {
    return this._client.get(path`/zones/${zoneID}/session-resource-access`, {
      query,
      ...options,
      __security: {},
    });
  }
}

/**
 * AWS KMS configuration for zone encryption. When not specified, the default
 * Keycard Cloud encryption key will be used.
 */
export interface EncryptionKeyAwsKmsConfig {
  /**
   * AWS KMS Key ARN for encrypting the zone's data
   */
  arn: string;

  type: 'aws';
}

/**
 * Pagination information
 */
export interface PageInfoPagination {
  /**
   * Whether there are more items after the current page
   */
  has_next_page: boolean;

  /**
   * Whether there are items before the current page
   */
  has_previous_page: boolean;

  /**
   * Cursor pointing to the last item in the current page
   */
  end_cursor?: string | null;

  /**
   * Cursor pointing to the first item in the current page
   */
  start_cursor?: string | null;
}

/**
 * A zone for organizing resources within an organization
 */
export interface Zone {
  /**
   * Unique identifier of the zone
   */
  id: string;

  /**
   * Entity creation timestamp
   */
  created_at: string;

  /**
   * Human-readable name
   */
  name: string;

  /**
   * Organization that owns this zone
   */
  organization_id: string;

  /**
   * Protocol configuration for a zone
   */
  protocols: Zone.Protocols;

  /**
   * URL-safe identifier, unique within the zone
   */
  slug: string;

  /**
   * Entity update timestamp
   */
  updated_at: string;

  /**
   * Custom domain name (CNAME) for the zone
   */
  cname?: string;

  /**
   * Application ID configured as the default MCP Gateway for the zone
   */
  default_mcp_gateway_application_id?: string;

  /**
   * Human-readable description
   */
  description?: string | null;

  /**
   * Whether directory open signups are enabled for the zone, only applies when
   * user_identity_provider_id is not set
   */
  directory_open_signups_enabled?: boolean;

  /**
   * AWS KMS configuration for zone encryption. When not specified, the default
   * Keycard Cloud encryption key will be used.
   */
  encryption_key?: EncryptionKeyAwsKmsConfig;

  /**
   * Login flow style for the zone. 'default' uses standard authentication,
   * 'identifier_first' uses identifier-based provider routing.
   */
  login_flow?: 'default' | 'identifier_first';

  /**
   * Permissions granted to the authenticated principal. Only populated when
   * expand[]=permissions query parameter is provided. Keys are resource types,
   * values are objects mapping action names to boolean values.
   */
  permissions?: { [key: string]: { [key: string]: boolean } };

  /**
   * Provider ID configured for user login
   */
  user_identity_provider_id?: string;
}

export namespace Zone {
  /**
   * Protocol configuration for a zone
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for a zone
     */
    oauth2: Protocols.Oauth2;

    /**
     * OpenID Connect protocol configuration for a zone
     */
    openid: Protocols.Openid;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for a zone
     */
    export interface Oauth2 {
      /**
       * OAuth 2.0 authorization endpoint
       */
      authorization_endpoint: string;

      /**
       * OAuth 2.0 Authorization Server Metadata endpoint
       * (.well-known/oauth-authorization-server)
       */
      authorization_server_metadata: string;

      /**
       * Whether Dynamic Client Registration is enabled
       */
      dcr_enabled: boolean;

      /**
       * OAuth 2.0 issuer identifier
       */
      issuer: string;

      /**
       * JSON Web Key Set endpoint
       */
      jwks_uri: string;

      /**
       * Whether PKCE is required for authorization code flows
       */
      pkce_required: boolean;

      /**
       * OAuth 2.0 redirect URI for this zone
       */
      redirect_uri: string;

      /**
       * OAuth 2.0 Dynamic Client Registration endpoint
       */
      registration_endpoint: string;

      /**
       * OAuth 2.0 token endpoint
       */
      token_endpoint: string;
    }

    /**
     * OpenID Connect protocol configuration for a zone
     */
    export interface Openid {
      /**
       * OpenID Connect Provider Configuration endpoint
       * (.well-known/openid-configuration)
       */
      provider_configuration: string;

      /**
       * OpenID Connect UserInfo endpoint
       */
      userinfo_endpoint: string;
    }
  }
}

export interface ZoneListResponse {
  items: Array<Zone>;

  /**
   * Pagination information
   */
  page_info: PageInfoPagination;
}

export interface ZoneListSessionResourceAccessResponse {
  items: Array<ZoneListSessionResourceAccessResponse.Item>;
}

export namespace ZoneListSessionResourceAccessResponse {
  /**
   * Aggregated record of session-resource access events
   */
  export interface Item {
    /**
     * When access first occurred
     */
    first_accessed_at: string;

    /**
     * When access most recently occurred
     */
    last_accessed_at: string;

    /**
     * Organization ID
     */
    organization_id: string;

    /**
     * Resource ID
     */
    resource_id: string;

    /**
     * Session ID
     */
    session_id: string;

    /**
     * Total number of access events for this session-resource pair
     */
    total_access_count: number;
  }
}

export interface ZoneCreateParams {
  /**
   * Human-readable name
   */
  name: string;

  /**
   * Custom domain name (CNAME) for the zone
   */
  cname?: string;

  /**
   * Assign a default MCP Gateway application to the zone
   */
  default_mcp_gateway_application?: boolean;

  /**
   * Human-readable description
   */
  description?: string | null;

  /**
   * Whether directory open signups are enabled for the zone, only applies when
   * user_identity_provider_id is not set
   */
  directory_open_signups_enabled?: boolean;

  /**
   * AWS KMS configuration for zone encryption. When not specified, the default
   * Keycard Cloud encryption key will be used.
   */
  encryption_key?: EncryptionKeyAwsKmsConfig;

  /**
   * Login flow style for the zone. 'default' uses standard authentication,
   * 'identifier_first' uses identifier-based provider routing.
   */
  login_flow?: 'default' | 'identifier_first';

  /**
   * Protocol configuration for zone creation
   */
  protocols?: ZoneCreateParams.Protocols;
}

export namespace ZoneCreateParams {
  /**
   * Protocol configuration for zone creation
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration for zone creation
     */
    oauth2?: Protocols.Oauth2;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration for zone creation
     */
    export interface Oauth2 {
      /**
       * Whether Dynamic Client Registration is enabled
       */
      dcr_enabled?: boolean;

      /**
       * Whether PKCE is required for authorization code flows
       */
      pkce_required?: boolean;
    }
  }
}

export interface ZoneRetrieveParams {
  'expand[]'?: 'permissions' | Array<'permissions'>;
}

export interface ZoneUpdateParams {
  /**
   * Custom domain name (CNAME) for the zone (set to null to remove)
   */
  cname?: string | null;

  /**
   * Application ID configured as the default MCP Gateway for the zone (set to null
   * to unset)
   */
  default_mcp_gateway_application_id?: string | null;

  /**
   * Human-readable description
   */
  description?: string | null;

  /**
   * Whether directory open signups are enabled for the zone, only applies when
   * user_identity_provider_id is not set
   */
  directory_open_signups_enabled?: boolean;

  /**
   * AWS KMS configuration for zone encryption update (set to null to remove
   * customer-managed key and revert to default)
   */
  encryption_key?: ZoneUpdateParams.EncryptionKey | null;

  /**
   * Login flow style for the zone. 'default' uses standard authentication,
   * 'identifier_first' uses identifier-based provider routing. Set to null to reset
   * to 'default'.
   */
  login_flow?: 'default' | 'identifier_first' | null;

  /**
   * Human-readable name
   */
  name?: string;

  /**
   * Protocol configuration update for a zone (partial update)
   */
  protocols?: ZoneUpdateParams.Protocols | null;

  /**
   * Provider ID to configure for user login (set to null to unset)
   */
  user_identity_provider_id?: string | null;
}

export namespace ZoneUpdateParams {
  /**
   * AWS KMS configuration for zone encryption update (set to null to remove
   * customer-managed key and revert to default)
   */
  export interface EncryptionKey {
    /**
     * AWS KMS Key ARN for encrypting the zone's data
     */
    arn: string;

    type: 'aws';
  }

  /**
   * Protocol configuration update for a zone (partial update)
   */
  export interface Protocols {
    /**
     * OAuth 2.0 protocol configuration update for a zone (partial update)
     */
    oauth2?: Protocols.Oauth2;
  }

  export namespace Protocols {
    /**
     * OAuth 2.0 protocol configuration update for a zone (partial update)
     */
    export interface Oauth2 {
      /**
       * Whether Dynamic Client Registration is enabled
       */
      dcr_enabled?: boolean | null;

      /**
       * Whether PKCE is required for authorization code flows
       */
      pkce_required?: boolean | null;
    }
  }
}

export interface ZoneListParams {
  cursor?: string;

  limit?: number;

  slug?: string;
}

export interface ZoneDeleteMcpServerParams {
  /**
   * Zone ID
   */
  zoneId: string;
}

export interface ZoneListSessionResourceAccessParams {
  /**
   * Filter sessions that have an initiator (application_id OR user_agent_id is set).
   */
  has_initiator?: 'true';

  /**
   * Filter by resource ID
   */
  resource_id?: string;

  /**
   * Filter by session ID
   */
  session_id?: string;

  /**
   * Filter by user ID
   */
  user_id?: string;
}

Zones.Applications = Applications;
Zones.ApplicationCredentials = ApplicationCredentials;
Zones.DelegatedGrants = DelegatedGrants;
Zones.McpGateways = McpGateways;
Zones.Providers = Providers;
Zones.Resources = Resources;
Zones.Sessions = Sessions;
Zones.UserAgents = UserAgents;
Zones.Users = Users;
Zones.Members = Members;
Zones.Secrets = Secrets;

export declare namespace Zones {
  export {
    type EncryptionKeyAwsKmsConfig as EncryptionKeyAwsKmsConfig,
    type PageInfoPagination as PageInfoPagination,
    type Zone as Zone,
    type ZoneListResponse as ZoneListResponse,
    type ZoneListSessionResourceAccessResponse as ZoneListSessionResourceAccessResponse,
    type ZoneCreateParams as ZoneCreateParams,
    type ZoneRetrieveParams as ZoneRetrieveParams,
    type ZoneUpdateParams as ZoneUpdateParams,
    type ZoneListParams as ZoneListParams,
    type ZoneDeleteMcpServerParams as ZoneDeleteMcpServerParams,
    type ZoneListSessionResourceAccessParams as ZoneListSessionResourceAccessParams,
  };

  export {
    Applications as Applications,
    type Application as Application,
    type ApplicationTrait as ApplicationTrait,
    type Metadata as Metadata,
    type MetadataUpdate as MetadataUpdate,
    type ApplicationListResponse as ApplicationListResponse,
    type ApplicationListCredentialsResponse as ApplicationListCredentialsResponse,
    type ApplicationListResourcesResponse as ApplicationListResourcesResponse,
    type ApplicationCreateParams as ApplicationCreateParams,
    type ApplicationRetrieveParams as ApplicationRetrieveParams,
    type ApplicationUpdateParams as ApplicationUpdateParams,
    type ApplicationListParams as ApplicationListParams,
    type ApplicationDeleteParams as ApplicationDeleteParams,
    type ApplicationListCredentialsParams as ApplicationListCredentialsParams,
    type ApplicationListResourcesParams as ApplicationListResourcesParams,
  };

  export {
    ApplicationCredentials as ApplicationCredentials,
    type BaseFields as BaseFields,
    type Credential as Credential,
    type Password as Password,
    type Public as Public,
    type PublicKey as PublicKey,
    type Token as Token,
    type URL as URL,
    type ApplicationCredentialCreateResponse as ApplicationCredentialCreateResponse,
    type ApplicationCredentialListResponse as ApplicationCredentialListResponse,
    type ApplicationCredentialCreateParams as ApplicationCredentialCreateParams,
    type ApplicationCredentialRetrieveParams as ApplicationCredentialRetrieveParams,
    type ApplicationCredentialUpdateParams as ApplicationCredentialUpdateParams,
    type ApplicationCredentialListParams as ApplicationCredentialListParams,
    type ApplicationCredentialDeleteParams as ApplicationCredentialDeleteParams,
  };

  export {
    DelegatedGrants as DelegatedGrants,
    type Grant as Grant,
    type DelegatedGrantListResponse as DelegatedGrantListResponse,
    type DelegatedGrantRetrieveParams as DelegatedGrantRetrieveParams,
    type DelegatedGrantUpdateParams as DelegatedGrantUpdateParams,
    type DelegatedGrantListParams as DelegatedGrantListParams,
    type DelegatedGrantDeleteParams as DelegatedGrantDeleteParams,
  };

  export {
    McpGateways as McpGateways,
    type McpGatewayCreateServerResponse as McpGatewayCreateServerResponse,
    type McpGatewayCreateServerParams as McpGatewayCreateServerParams,
  };

  export {
    Providers as Providers,
    type Provider as Provider,
    type ProviderListResponse as ProviderListResponse,
    type ProviderCreateParams as ProviderCreateParams,
    type ProviderRetrieveParams as ProviderRetrieveParams,
    type ProviderUpdateParams as ProviderUpdateParams,
    type ProviderListParams as ProviderListParams,
    type ProviderDeleteParams as ProviderDeleteParams,
  };

  export {
    Resources as Resources,
    type ResourceListResponse as ResourceListResponse,
    type ResourceCreateParams as ResourceCreateParams,
    type ResourceRetrieveParams as ResourceRetrieveParams,
    type ResourceUpdateParams as ResourceUpdateParams,
    type ResourceListParams as ResourceListParams,
    type ResourceDeleteParams as ResourceDeleteParams,
  };

  export {
    Sessions as Sessions,
    type Session as Session,
    type SessionListResponse as SessionListResponse,
    type SessionRetrieveParams as SessionRetrieveParams,
    type SessionUpdateParams as SessionUpdateParams,
    type SessionListParams as SessionListParams,
    type SessionDeleteParams as SessionDeleteParams,
  };

  export {
    UserAgents as UserAgents,
    type UserAgent as UserAgent,
    type UserAgentListResponse as UserAgentListResponse,
    type UserAgentRetrieveParams as UserAgentRetrieveParams,
  };

  export {
    Users as Users,
    type User as User,
    type UserListResponse as UserListResponse,
    type UserRetrieveParams as UserRetrieveParams,
  };

  export {
    Members as Members,
    type ZoneMember as ZoneMember,
    type ZoneRole as ZoneRole,
    type MemberListResponse as MemberListResponse,
    type MemberRetrieveParams as MemberRetrieveParams,
    type MemberUpdateParams as MemberUpdateParams,
    type MemberListParams as MemberListParams,
    type MemberDeleteParams as MemberDeleteParams,
    type MemberAddParams as MemberAddParams,
  };

  export {
    Secrets as Secrets,
    type Secret as Secret,
    type SecretPasswordFields as SecretPasswordFields,
    type SecretTokenFields as SecretTokenFields,
    type SecretRetrieveResponse as SecretRetrieveResponse,
    type SecretListResponse as SecretListResponse,
    type SecretCreateParams as SecretCreateParams,
    type SecretRetrieveParams as SecretRetrieveParams,
    type SecretUpdateParams as SecretUpdateParams,
    type SecretListParams as SecretListParams,
    type SecretDeleteParams as SecretDeleteParams,
  };
}
