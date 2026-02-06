// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProvidersAPI from './providers';
import * as DependenciesAPI from './applications/dependencies';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class McpGateways extends APIResource {
  /**
   * Creates all resources required to access an MCP server through an MCP gateway
   */
  createServer(
    applicationID: string,
    params: McpGatewayCreateServerParams,
    options?: RequestOptions,
  ): APIPromise<McpGatewayCreateServerResponse> {
    const { zoneId, ...body } = params;
    return this._client.post(path`/zones/${zoneId}/mcp-gateways/${applicationID}/mcp-servers`, {
      body,
      ...options,
    });
  }
}

/**
 * Response containing the created upstream provider, upstream resource, and
 * downstream resource for an MCP server
 */
export interface McpGatewayCreateServerResponse {
  /**
   * A Resource is a system that exposes protected information or functionality. It
   * requires authentication of the requesting actor, which may be a user or
   * application, before allowing access.
   */
  downstream_resource: DependenciesAPI.Resource;

  /**
   * A Provider is a system that supplies access to Resources and allows actors
   * (Users or Applications) to authenticate.
   */
  upstream_provider: ProvidersAPI.Provider;

  /**
   * A Resource is a system that exposes protected information or functionality. It
   * requires authentication of the requesting actor, which may be a user or
   * application, before allowing access.
   */
  upstream_resource: DependenciesAPI.Resource;
}

export interface McpGatewayCreateServerParams {
  /**
   * Path param: Zone ID
   */
  zoneId: string;

  /**
   * Body param: Downstream MCP server config
   */
  downstream: McpGatewayCreateServerParams.Downstream;

  /**
   * Body param: Upstream MCP server config
   */
  upstream: McpGatewayCreateServerParams.Upstream;

  /**
   * Body param: Credential provider for the upstream connection
   */
  upstream_provider: McpGatewayCreateServerParams.UpstreamProvider;
}

export namespace McpGatewayCreateServerParams {
  /**
   * Downstream MCP server config
   */
  export interface Downstream {
    /**
     * URL-safe identifier, unique within the zone
     */
    slug?: string;
  }

  /**
   * Upstream MCP server config
   */
  export interface Upstream {
    /**
     * User specified identifier, unique within the zone
     */
    identifier: string;

    /**
     * Human-readable name
     */
    name: string;
  }

  /**
   * Credential provider for the upstream connection
   */
  export interface UpstreamProvider {
    /**
     * User specified identifier, unique within the zone
     */
    identifier: string;

    /**
     * Human-readable name
     */
    name: string;
  }
}

export declare namespace McpGateways {
  export {
    type McpGatewayCreateServerResponse as McpGatewayCreateServerResponse,
    type McpGatewayCreateServerParams as McpGatewayCreateServerParams,
  };
}
