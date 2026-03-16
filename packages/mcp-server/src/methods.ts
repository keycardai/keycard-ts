// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.zones.create',
    fullyQualifiedName: 'zones.create',
    httpMethod: 'post',
    httpPath: '/zones',
  },
  {
    clientCallName: 'client.zones.retrieve',
    fullyQualifiedName: 'zones.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}',
  },
  {
    clientCallName: 'client.zones.update',
    fullyQualifiedName: 'zones.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zoneId}',
  },
  {
    clientCallName: 'client.zones.list',
    fullyQualifiedName: 'zones.list',
    httpMethod: 'get',
    httpPath: '/zones',
  },
  {
    clientCallName: 'client.zones.delete',
    fullyQualifiedName: 'zones.delete',
    httpMethod: 'delete',
    httpPath: '/zones/{zoneId}',
  },
  {
    clientCallName: 'client.zones.listSessionResourceAccess',
    fullyQualifiedName: 'zones.listSessionResourceAccess',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/session-resource-access',
  },
  {
    clientCallName: 'client.zones.applications.create',
    fullyQualifiedName: 'zones.applications.create',
    httpMethod: 'post',
    httpPath: '/zones/{zoneId}/applications',
  },
  {
    clientCallName: 'client.zones.applications.retrieve',
    fullyQualifiedName: 'zones.applications.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/applications/{id}',
  },
  {
    clientCallName: 'client.zones.applications.update',
    fullyQualifiedName: 'zones.applications.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zoneId}/applications/{id}',
  },
  {
    clientCallName: 'client.zones.applications.list',
    fullyQualifiedName: 'zones.applications.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/applications',
  },
  {
    clientCallName: 'client.zones.applications.delete',
    fullyQualifiedName: 'zones.applications.delete',
    httpMethod: 'delete',
    httpPath: '/zones/{zoneId}/applications/{id}',
  },
  {
    clientCallName: 'client.zones.applications.listCredentials',
    fullyQualifiedName: 'zones.applications.listCredentials',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/applications/{id}/application-credentials',
  },
  {
    clientCallName: 'client.zones.applications.listResources',
    fullyQualifiedName: 'zones.applications.listResources',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/applications/{id}/resources',
  },
  {
    clientCallName: 'client.zones.applications.dependencies.retrieve',
    fullyQualifiedName: 'zones.applications.dependencies.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/applications/{id}/dependencies/{dependencyId}',
  },
  {
    clientCallName: 'client.zones.applications.dependencies.list',
    fullyQualifiedName: 'zones.applications.dependencies.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/applications/{id}/dependencies',
  },
  {
    clientCallName: 'client.zones.applications.dependencies.add',
    fullyQualifiedName: 'zones.applications.dependencies.add',
    httpMethod: 'put',
    httpPath: '/zones/{zoneId}/applications/{id}/dependencies/{dependencyId}',
  },
  {
    clientCallName: 'client.zones.applications.dependencies.remove',
    fullyQualifiedName: 'zones.applications.dependencies.remove',
    httpMethod: 'delete',
    httpPath: '/zones/{zoneId}/applications/{id}/dependencies/{dependencyId}',
  },
  {
    clientCallName: 'client.zones.applicationCredentials.create',
    fullyQualifiedName: 'zones.applicationCredentials.create',
    httpMethod: 'post',
    httpPath: '/zones/{zoneId}/application-credentials',
  },
  {
    clientCallName: 'client.zones.applicationCredentials.retrieve',
    fullyQualifiedName: 'zones.applicationCredentials.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/application-credentials/{id}',
  },
  {
    clientCallName: 'client.zones.applicationCredentials.update',
    fullyQualifiedName: 'zones.applicationCredentials.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zoneId}/application-credentials/{id}',
  },
  {
    clientCallName: 'client.zones.applicationCredentials.list',
    fullyQualifiedName: 'zones.applicationCredentials.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/application-credentials',
  },
  {
    clientCallName: 'client.zones.applicationCredentials.delete',
    fullyQualifiedName: 'zones.applicationCredentials.delete',
    httpMethod: 'delete',
    httpPath: '/zones/{zoneId}/application-credentials/{id}',
  },
  {
    clientCallName: 'client.zones.delegatedGrants.retrieve',
    fullyQualifiedName: 'zones.delegatedGrants.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/delegated-grants/{id}',
  },
  {
    clientCallName: 'client.zones.delegatedGrants.update',
    fullyQualifiedName: 'zones.delegatedGrants.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zoneId}/delegated-grants/{id}',
  },
  {
    clientCallName: 'client.zones.delegatedGrants.list',
    fullyQualifiedName: 'zones.delegatedGrants.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/delegated-grants',
  },
  {
    clientCallName: 'client.zones.delegatedGrants.delete',
    fullyQualifiedName: 'zones.delegatedGrants.delete',
    httpMethod: 'delete',
    httpPath: '/zones/{zoneId}/delegated-grants/{id}',
  },
  {
    clientCallName: 'client.zones.providers.create',
    fullyQualifiedName: 'zones.providers.create',
    httpMethod: 'post',
    httpPath: '/zones/{zoneId}/providers',
  },
  {
    clientCallName: 'client.zones.providers.retrieve',
    fullyQualifiedName: 'zones.providers.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/providers/{id}',
  },
  {
    clientCallName: 'client.zones.providers.update',
    fullyQualifiedName: 'zones.providers.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zoneId}/providers/{id}',
  },
  {
    clientCallName: 'client.zones.providers.list',
    fullyQualifiedName: 'zones.providers.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/providers',
  },
  {
    clientCallName: 'client.zones.providers.delete',
    fullyQualifiedName: 'zones.providers.delete',
    httpMethod: 'delete',
    httpPath: '/zones/{zoneId}/providers/{id}',
  },
  {
    clientCallName: 'client.zones.resources.create',
    fullyQualifiedName: 'zones.resources.create',
    httpMethod: 'post',
    httpPath: '/zones/{zoneId}/resources',
  },
  {
    clientCallName: 'client.zones.resources.retrieve',
    fullyQualifiedName: 'zones.resources.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/resources/{id}',
  },
  {
    clientCallName: 'client.zones.resources.update',
    fullyQualifiedName: 'zones.resources.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zoneId}/resources/{id}',
  },
  {
    clientCallName: 'client.zones.resources.list',
    fullyQualifiedName: 'zones.resources.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/resources',
  },
  {
    clientCallName: 'client.zones.resources.delete',
    fullyQualifiedName: 'zones.resources.delete',
    httpMethod: 'delete',
    httpPath: '/zones/{zoneId}/resources/{id}',
  },
  {
    clientCallName: 'client.zones.sessions.retrieve',
    fullyQualifiedName: 'zones.sessions.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/sessions/{id}',
  },
  {
    clientCallName: 'client.zones.sessions.update',
    fullyQualifiedName: 'zones.sessions.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zoneId}/sessions/{id}',
  },
  {
    clientCallName: 'client.zones.sessions.list',
    fullyQualifiedName: 'zones.sessions.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/sessions',
  },
  {
    clientCallName: 'client.zones.sessions.delete',
    fullyQualifiedName: 'zones.sessions.delete',
    httpMethod: 'delete',
    httpPath: '/zones/{zoneId}/sessions/{id}',
  },
  {
    clientCallName: 'client.zones.userAgents.retrieve',
    fullyQualifiedName: 'zones.userAgents.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/user-agents/{id}',
  },
  {
    clientCallName: 'client.zones.userAgents.list',
    fullyQualifiedName: 'zones.userAgents.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/user-agents',
  },
  {
    clientCallName: 'client.zones.users.retrieve',
    fullyQualifiedName: 'zones.users.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/users/{id}',
  },
  {
    clientCallName: 'client.zones.users.list',
    fullyQualifiedName: 'zones.users.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/users',
  },
  {
    clientCallName: 'client.zones.members.retrieve',
    fullyQualifiedName: 'zones.members.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/members/{organizationUserId}',
  },
  {
    clientCallName: 'client.zones.members.update',
    fullyQualifiedName: 'zones.members.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zoneId}/members/{organizationUserId}',
  },
  {
    clientCallName: 'client.zones.members.list',
    fullyQualifiedName: 'zones.members.list',
    httpMethod: 'get',
    httpPath: '/zones/{zoneId}/members',
  },
  {
    clientCallName: 'client.zones.members.delete',
    fullyQualifiedName: 'zones.members.delete',
    httpMethod: 'delete',
    httpPath: '/zones/{zoneId}/members/{organizationUserId}',
  },
  {
    clientCallName: 'client.zones.members.add',
    fullyQualifiedName: 'zones.members.add',
    httpMethod: 'post',
    httpPath: '/zones/{zoneId}/members',
  },
  {
    clientCallName: 'client.zones.secrets.create',
    fullyQualifiedName: 'zones.secrets.create',
    httpMethod: 'post',
    httpPath: '/zones/{zone_id}/secrets',
  },
  {
    clientCallName: 'client.zones.secrets.retrieve',
    fullyQualifiedName: 'zones.secrets.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/secrets/{id}',
  },
  {
    clientCallName: 'client.zones.secrets.update',
    fullyQualifiedName: 'zones.secrets.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zone_id}/secrets/{id}',
  },
  {
    clientCallName: 'client.zones.secrets.list',
    fullyQualifiedName: 'zones.secrets.list',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/secrets',
  },
  {
    clientCallName: 'client.zones.secrets.delete',
    fullyQualifiedName: 'zones.secrets.delete',
    httpMethod: 'delete',
    httpPath: '/zones/{zone_id}/secrets/{id}',
  },
  {
    clientCallName: 'client.zones.policySchemas.retrieve',
    fullyQualifiedName: 'zones.policySchemas.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policy-schemas/{version}',
  },
  {
    clientCallName: 'client.zones.policySchemas.list',
    fullyQualifiedName: 'zones.policySchemas.list',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policy-schemas',
  },
  {
    clientCallName: 'client.zones.policySchemas.setDefault',
    fullyQualifiedName: 'zones.policySchemas.setDefault',
    httpMethod: 'patch',
    httpPath: '/zones/{zone_id}/policy-schemas/{version}',
  },
  {
    clientCallName: 'client.zones.policies.create',
    fullyQualifiedName: 'zones.policies.create',
    httpMethod: 'post',
    httpPath: '/zones/{zone_id}/policies',
  },
  {
    clientCallName: 'client.zones.policies.retrieve',
    fullyQualifiedName: 'zones.policies.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policies/{policy_id}',
  },
  {
    clientCallName: 'client.zones.policies.update',
    fullyQualifiedName: 'zones.policies.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zone_id}/policies/{policy_id}',
  },
  {
    clientCallName: 'client.zones.policies.list',
    fullyQualifiedName: 'zones.policies.list',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policies',
  },
  {
    clientCallName: 'client.zones.policies.archive',
    fullyQualifiedName: 'zones.policies.archive',
    httpMethod: 'delete',
    httpPath: '/zones/{zone_id}/policies/{policy_id}',
  },
  {
    clientCallName: 'client.zones.policies.versions.create',
    fullyQualifiedName: 'zones.policies.versions.create',
    httpMethod: 'post',
    httpPath: '/zones/{zone_id}/policies/{policy_id}/versions',
  },
  {
    clientCallName: 'client.zones.policies.versions.retrieve',
    fullyQualifiedName: 'zones.policies.versions.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policies/{policy_id}/versions/{version_id}',
  },
  {
    clientCallName: 'client.zones.policies.versions.list',
    fullyQualifiedName: 'zones.policies.versions.list',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policies/{policy_id}/versions',
  },
  {
    clientCallName: 'client.zones.policies.versions.archive',
    fullyQualifiedName: 'zones.policies.versions.archive',
    httpMethod: 'delete',
    httpPath: '/zones/{zone_id}/policies/{policy_id}/versions/{version_id}',
  },
  {
    clientCallName: 'client.zones.policySets.create',
    fullyQualifiedName: 'zones.policySets.create',
    httpMethod: 'post',
    httpPath: '/zones/{zone_id}/policy-sets',
  },
  {
    clientCallName: 'client.zones.policySets.retrieve',
    fullyQualifiedName: 'zones.policySets.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policy-sets/{policy_set_id}',
  },
  {
    clientCallName: 'client.zones.policySets.update',
    fullyQualifiedName: 'zones.policySets.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zone_id}/policy-sets/{policy_set_id}',
  },
  {
    clientCallName: 'client.zones.policySets.list',
    fullyQualifiedName: 'zones.policySets.list',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policy-sets',
  },
  {
    clientCallName: 'client.zones.policySets.archive',
    fullyQualifiedName: 'zones.policySets.archive',
    httpMethod: 'delete',
    httpPath: '/zones/{zone_id}/policy-sets/{policy_set_id}',
  },
  {
    clientCallName: 'client.zones.policySets.versions.create',
    fullyQualifiedName: 'zones.policySets.versions.create',
    httpMethod: 'post',
    httpPath: '/zones/{zone_id}/policy-sets/{policy_set_id}/versions',
  },
  {
    clientCallName: 'client.zones.policySets.versions.retrieve',
    fullyQualifiedName: 'zones.policySets.versions.retrieve',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policy-sets/{policy_set_id}/versions/{version_id}',
  },
  {
    clientCallName: 'client.zones.policySets.versions.update',
    fullyQualifiedName: 'zones.policySets.versions.update',
    httpMethod: 'patch',
    httpPath: '/zones/{zone_id}/policy-sets/{policy_set_id}/versions/{version_id}',
  },
  {
    clientCallName: 'client.zones.policySets.versions.list',
    fullyQualifiedName: 'zones.policySets.versions.list',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policy-sets/{policy_set_id}/versions',
  },
  {
    clientCallName: 'client.zones.policySets.versions.archive',
    fullyQualifiedName: 'zones.policySets.versions.archive',
    httpMethod: 'delete',
    httpPath: '/zones/{zone_id}/policy-sets/{policy_set_id}/versions/{version_id}',
  },
  {
    clientCallName: 'client.zones.policySets.versions.listPolicies',
    fullyQualifiedName: 'zones.policySets.versions.listPolicies',
    httpMethod: 'get',
    httpPath: '/zones/{zone_id}/policy-sets/{policy_set_id}/versions/{version_id}/policies',
  },
  {
    clientCallName: 'client.organizations.create',
    fullyQualifiedName: 'organizations.create',
    httpMethod: 'post',
    httpPath: '/organizations',
  },
  {
    clientCallName: 'client.organizations.retrieve',
    fullyQualifiedName: 'organizations.retrieve',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}',
  },
  {
    clientCallName: 'client.organizations.update',
    fullyQualifiedName: 'organizations.update',
    httpMethod: 'patch',
    httpPath: '/organizations/{organization_id}',
  },
  {
    clientCallName: 'client.organizations.list',
    fullyQualifiedName: 'organizations.list',
    httpMethod: 'get',
    httpPath: '/organizations',
  },
  {
    clientCallName: 'client.organizations.exchangeToken',
    fullyQualifiedName: 'organizations.exchangeToken',
    httpMethod: 'post',
    httpPath: '/organizations/{organization_id}/token',
  },
  {
    clientCallName: 'client.organizations.listIdentities',
    fullyQualifiedName: 'organizations.listIdentities',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}/identities',
  },
  {
    clientCallName: 'client.organizations.listRoles',
    fullyQualifiedName: 'organizations.listRoles',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}/roles',
  },
  {
    clientCallName: 'client.organizations.users.retrieve',
    fullyQualifiedName: 'organizations.users.retrieve',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}/users/{user_id}',
  },
  {
    clientCallName: 'client.organizations.users.update',
    fullyQualifiedName: 'organizations.users.update',
    httpMethod: 'patch',
    httpPath: '/organizations/{organization_id}/users/{user_id}',
  },
  {
    clientCallName: 'client.organizations.users.list',
    fullyQualifiedName: 'organizations.users.list',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}/users',
  },
  {
    clientCallName: 'client.organizations.users.delete',
    fullyQualifiedName: 'organizations.users.delete',
    httpMethod: 'delete',
    httpPath: '/organizations/{organization_id}/users/{user_id}',
  },
  {
    clientCallName: 'client.organizations.invitations.create',
    fullyQualifiedName: 'organizations.invitations.create',
    httpMethod: 'post',
    httpPath: '/organizations/{organization_id}/invitations',
  },
  {
    clientCallName: 'client.organizations.invitations.list',
    fullyQualifiedName: 'organizations.invitations.list',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}/invitations',
  },
  {
    clientCallName: 'client.organizations.invitations.delete',
    fullyQualifiedName: 'organizations.invitations.delete',
    httpMethod: 'delete',
    httpPath: '/organizations/{organization_id}/invitations/{invitation_id}',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.create',
    fullyQualifiedName: 'organizations.serviceAccounts.create',
    httpMethod: 'post',
    httpPath: '/organizations/{organization_id}/service-accounts',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.retrieve',
    fullyQualifiedName: 'organizations.serviceAccounts.retrieve',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}/service-accounts/{service_account_id}',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.update',
    fullyQualifiedName: 'organizations.serviceAccounts.update',
    httpMethod: 'patch',
    httpPath: '/organizations/{organization_id}/service-accounts/{service_account_id}',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.list',
    fullyQualifiedName: 'organizations.serviceAccounts.list',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}/service-accounts',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.delete',
    fullyQualifiedName: 'organizations.serviceAccounts.delete',
    httpMethod: 'delete',
    httpPath: '/organizations/{organization_id}/service-accounts/{service_account_id}',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.credentials.create',
    fullyQualifiedName: 'organizations.serviceAccounts.credentials.create',
    httpMethod: 'post',
    httpPath: '/organizations/{organization_id}/service-accounts/{service_account_id}/credentials',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.credentials.retrieve',
    fullyQualifiedName: 'organizations.serviceAccounts.credentials.retrieve',
    httpMethod: 'get',
    httpPath:
      '/organizations/{organization_id}/service-accounts/{service_account_id}/credentials/{credential_id}',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.credentials.update',
    fullyQualifiedName: 'organizations.serviceAccounts.credentials.update',
    httpMethod: 'patch',
    httpPath:
      '/organizations/{organization_id}/service-accounts/{service_account_id}/credentials/{credential_id}',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.credentials.list',
    fullyQualifiedName: 'organizations.serviceAccounts.credentials.list',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}/service-accounts/{service_account_id}/credentials',
  },
  {
    clientCallName: 'client.organizations.serviceAccounts.credentials.delete',
    fullyQualifiedName: 'organizations.serviceAccounts.credentials.delete',
    httpMethod: 'delete',
    httpPath:
      '/organizations/{organization_id}/service-accounts/{service_account_id}/credentials/{credential_id}',
  },
  {
    clientCallName: 'client.organizations.ssoConnection.retrieve',
    fullyQualifiedName: 'organizations.ssoConnection.retrieve',
    httpMethod: 'get',
    httpPath: '/organizations/{organization_id}/sso-connection',
  },
  {
    clientCallName: 'client.organizations.ssoConnection.update',
    fullyQualifiedName: 'organizations.ssoConnection.update',
    httpMethod: 'patch',
    httpPath: '/organizations/{organization_id}/sso-connection',
  },
  {
    clientCallName: 'client.organizations.ssoConnection.disable',
    fullyQualifiedName: 'organizations.ssoConnection.disable',
    httpMethod: 'delete',
    httpPath: '/organizations/{organization_id}/sso-connection',
  },
  {
    clientCallName: 'client.organizations.ssoConnection.enable',
    fullyQualifiedName: 'organizations.ssoConnection.enable',
    httpMethod: 'post',
    httpPath: '/organizations/{organization_id}/sso-connection',
  },
  {
    clientCallName: 'client.invitations.retrieve',
    fullyQualifiedName: 'invitations.retrieve',
    httpMethod: 'get',
    httpPath: '/invitations/{token}',
  },
  {
    clientCallName: 'client.invitations.accept',
    fullyQualifiedName: 'invitations.accept',
    httpMethod: 'post',
    httpPath: '/invitations/{token}/accept',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
