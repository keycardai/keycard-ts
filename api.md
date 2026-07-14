# Zones

Types:

- <code><a href="./src/resources/zones/zones.ts">EncryptionKeyAwsKmsConfig</a></code>
- <code><a href="./src/resources/zones/zones.ts">PageInfoPagination</a></code>
- <code><a href="./src/resources/zones/zones.ts">Zone</a></code>
- <code><a href="./src/resources/zones/zones.ts">ZoneListResponse</a></code>

Methods:

- <code title="post /zones">client.zones.<a href="./src/resources/zones/zones.ts">create</a>({ ...params }) -> Zone</code>
- <code title="get /zones/{zoneId}">client.zones.<a href="./src/resources/zones/zones.ts">retrieve</a>(zoneID, { ...params }) -> Zone</code>
- <code title="patch /zones/{zoneId}">client.zones.<a href="./src/resources/zones/zones.ts">update</a>(zoneID, { ...params }) -> Zone</code>
- <code title="get /zones">client.zones.<a href="./src/resources/zones/zones.ts">list</a>({ ...params }) -> ZoneListResponse</code>
- <code title="delete /zones/{zoneId}">client.zones.<a href="./src/resources/zones/zones.ts">delete</a>(zoneID) -> void</code>

## Applications

Types:

- <code><a href="./src/resources/zones/applications/applications.ts">Application</a></code>
- <code><a href="./src/resources/zones/applications/applications.ts">ApplicationTrait</a></code>
- <code><a href="./src/resources/zones/applications/applications.ts">Metadata</a></code>
- <code><a href="./src/resources/zones/applications/applications.ts">MetadataUpdate</a></code>
- <code><a href="./src/resources/zones/applications/applications.ts">ApplicationListResponse</a></code>
- <code><a href="./src/resources/zones/applications/applications.ts">ApplicationListCredentialsResponse</a></code>
- <code><a href="./src/resources/zones/applications/applications.ts">ApplicationListResourcesResponse</a></code>

Methods:

- <code title="post /zones/{zoneId}/applications">client.zones.applications.<a href="./src/resources/zones/applications/applications.ts">create</a>(zoneID, { ...params }) -> Application</code>
- <code title="get /zones/{zoneId}/applications/{id}">client.zones.applications.<a href="./src/resources/zones/applications/applications.ts">retrieve</a>(id, { ...params }) -> Application</code>
- <code title="patch /zones/{zoneId}/applications/{id}">client.zones.applications.<a href="./src/resources/zones/applications/applications.ts">update</a>(id, { ...params }) -> Application</code>
- <code title="get /zones/{zoneId}/applications">client.zones.applications.<a href="./src/resources/zones/applications/applications.ts">list</a>(zoneID, { ...params }) -> ApplicationListResponse</code>
- <code title="delete /zones/{zoneId}/applications/{id}">client.zones.applications.<a href="./src/resources/zones/applications/applications.ts">delete</a>(id, { ...params }) -> void</code>
- <code title="get /zones/{zoneId}/applications/{id}/application-credentials">client.zones.applications.<a href="./src/resources/zones/applications/applications.ts">listCredentials</a>(id, { ...params }) -> ApplicationListCredentialsResponse</code>
- <code title="get /zones/{zoneId}/applications/{id}/resources">client.zones.applications.<a href="./src/resources/zones/applications/applications.ts">listResources</a>(id, { ...params }) -> ApplicationListResourcesResponse</code>

### Dependencies

Types:

- <code><a href="./src/resources/zones/applications/dependencies.ts">Resource</a></code>
- <code><a href="./src/resources/zones/applications/dependencies.ts">DependencyListResponse</a></code>

Methods:

- <code title="get /zones/{zoneId}/applications/{id}/dependencies/{dependencyId}">client.zones.applications.dependencies.<a href="./src/resources/zones/applications/dependencies.ts">retrieve</a>(dependencyID, { ...params }) -> Resource</code>
- <code title="get /zones/{zoneId}/applications/{id}/dependencies">client.zones.applications.dependencies.<a href="./src/resources/zones/applications/dependencies.ts">list</a>(id, { ...params }) -> DependencyListResponse</code>
- <code title="put /zones/{zoneId}/applications/{id}/dependencies/{dependencyId}">client.zones.applications.dependencies.<a href="./src/resources/zones/applications/dependencies.ts">add</a>(dependencyID, { ...params }) -> void</code>
- <code title="delete /zones/{zoneId}/applications/{id}/dependencies/{dependencyId}">client.zones.applications.dependencies.<a href="./src/resources/zones/applications/dependencies.ts">remove</a>(dependencyID, { ...params }) -> void</code>

## ApplicationCredentials

Types:

- <code><a href="./src/resources/zones/application-credentials.ts">BaseFields</a></code>
- <code><a href="./src/resources/zones/application-credentials.ts">Credential</a></code>
- <code><a href="./src/resources/zones/application-credentials.ts">Password</a></code>
- <code><a href="./src/resources/zones/application-credentials.ts">Public</a></code>
- <code><a href="./src/resources/zones/application-credentials.ts">PublicKey</a></code>
- <code><a href="./src/resources/zones/application-credentials.ts">Token</a></code>
- <code><a href="./src/resources/zones/application-credentials.ts">URL</a></code>
- <code><a href="./src/resources/zones/application-credentials.ts">ApplicationCredentialCreateResponse</a></code>
- <code><a href="./src/resources/zones/application-credentials.ts">ApplicationCredentialListResponse</a></code>

Methods:

- <code title="post /zones/{zoneId}/application-credentials">client.zones.applicationCredentials.<a href="./src/resources/zones/application-credentials.ts">create</a>(zoneID, { ...params }) -> ApplicationCredentialCreateResponse</code>
- <code title="get /zones/{zoneId}/application-credentials/{id}">client.zones.applicationCredentials.<a href="./src/resources/zones/application-credentials.ts">retrieve</a>(id, { ...params }) -> Credential</code>
- <code title="patch /zones/{zoneId}/application-credentials/{id}">client.zones.applicationCredentials.<a href="./src/resources/zones/application-credentials.ts">update</a>(id, { ...params }) -> Credential</code>
- <code title="get /zones/{zoneId}/application-credentials">client.zones.applicationCredentials.<a href="./src/resources/zones/application-credentials.ts">list</a>(zoneID, { ...params }) -> ApplicationCredentialListResponse</code>
- <code title="delete /zones/{zoneId}/application-credentials/{id}">client.zones.applicationCredentials.<a href="./src/resources/zones/application-credentials.ts">delete</a>(id, { ...params }) -> void</code>

## DelegatedGrants

Types:

- <code><a href="./src/resources/zones/delegated-grants.ts">Grant</a></code>
- <code><a href="./src/resources/zones/delegated-grants.ts">DelegatedGrantListResponse</a></code>

Methods:

- <code title="get /zones/{zoneId}/delegated-grants/{id}">client.zones.delegatedGrants.<a href="./src/resources/zones/delegated-grants.ts">retrieve</a>(id, { ...params }) -> Grant</code>
- <code title="patch /zones/{zoneId}/delegated-grants/{id}">client.zones.delegatedGrants.<a href="./src/resources/zones/delegated-grants.ts">update</a>(id, { ...params }) -> Grant</code>
- <code title="get /zones/{zoneId}/delegated-grants">client.zones.delegatedGrants.<a href="./src/resources/zones/delegated-grants.ts">list</a>(zoneID, { ...params }) -> DelegatedGrantListResponse</code>
- <code title="delete /zones/{zoneId}/delegated-grants/{id}">client.zones.delegatedGrants.<a href="./src/resources/zones/delegated-grants.ts">delete</a>(id, { ...params }) -> void</code>

## Providers

Types:

- <code><a href="./src/resources/zones/providers.ts">Provider</a></code>
- <code><a href="./src/resources/zones/providers.ts">ProviderListResponse</a></code>

Methods:

- <code title="post /zones/{zoneId}/providers">client.zones.providers.<a href="./src/resources/zones/providers.ts">create</a>(zoneID, { ...params }) -> Provider</code>
- <code title="get /zones/{zoneId}/providers/{id}">client.zones.providers.<a href="./src/resources/zones/providers.ts">retrieve</a>(id, { ...params }) -> Provider</code>
- <code title="patch /zones/{zoneId}/providers/{id}">client.zones.providers.<a href="./src/resources/zones/providers.ts">update</a>(id, { ...params }) -> Provider</code>
- <code title="get /zones/{zoneId}/providers">client.zones.providers.<a href="./src/resources/zones/providers.ts">list</a>(zoneID, { ...params }) -> ProviderListResponse</code>
- <code title="delete /zones/{zoneId}/providers/{id}">client.zones.providers.<a href="./src/resources/zones/providers.ts">delete</a>(id, { ...params }) -> void</code>

## Resources

Types:

- <code><a href="./src/resources/zones/resources.ts">ResourceListResponse</a></code>

Methods:

- <code title="post /zones/{zoneId}/resources">client.zones.resources.<a href="./src/resources/zones/resources.ts">create</a>(zoneID, { ...params }) -> Resource</code>
- <code title="get /zones/{zoneId}/resources/{id}">client.zones.resources.<a href="./src/resources/zones/resources.ts">retrieve</a>(id, { ...params }) -> Resource</code>
- <code title="patch /zones/{zoneId}/resources/{id}">client.zones.resources.<a href="./src/resources/zones/resources.ts">update</a>(id, { ...params }) -> Resource</code>
- <code title="get /zones/{zoneId}/resources">client.zones.resources.<a href="./src/resources/zones/resources.ts">list</a>(zoneID, { ...params }) -> ResourceListResponse</code>
- <code title="delete /zones/{zoneId}/resources/{id}">client.zones.resources.<a href="./src/resources/zones/resources.ts">delete</a>(id, { ...params }) -> void</code>

## Sessions

Types:

- <code><a href="./src/resources/zones/sessions.ts">Session</a></code>
- <code><a href="./src/resources/zones/sessions.ts">SessionListResponse</a></code>

Methods:

- <code title="get /zones/{zoneId}/sessions/{id}">client.zones.sessions.<a href="./src/resources/zones/sessions.ts">retrieve</a>(id, { ...params }) -> Session</code>
- <code title="patch /zones/{zoneId}/sessions/{id}">client.zones.sessions.<a href="./src/resources/zones/sessions.ts">update</a>(id, { ...params }) -> Session</code>
- <code title="get /zones/{zoneId}/sessions">client.zones.sessions.<a href="./src/resources/zones/sessions.ts">list</a>(zoneID, { ...params }) -> SessionListResponse</code>
- <code title="delete /zones/{zoneId}/sessions/{id}">client.zones.sessions.<a href="./src/resources/zones/sessions.ts">delete</a>(id, { ...params }) -> void</code>

## UserAgents

Types:

- <code><a href="./src/resources/zones/user-agents.ts">UserAgent</a></code>
- <code><a href="./src/resources/zones/user-agents.ts">UserAgentListResponse</a></code>

Methods:

- <code title="get /zones/{zoneId}/user-agents/{id}">client.zones.userAgents.<a href="./src/resources/zones/user-agents.ts">retrieve</a>(id, { ...params }) -> UserAgent</code>
- <code title="get /zones/{zoneId}/user-agents">client.zones.userAgents.<a href="./src/resources/zones/user-agents.ts">list</a>(zoneID, { ...params }) -> UserAgentListResponse</code>

## Users

Types:

- <code><a href="./src/resources/zones/users.ts">User</a></code>
- <code><a href="./src/resources/zones/users.ts">UserListResponse</a></code>

Methods:

- <code title="get /zones/{zoneId}/users/{id}">client.zones.users.<a href="./src/resources/zones/users.ts">retrieve</a>(id, { ...params }) -> User</code>
- <code title="get /zones/{zoneId}/users">client.zones.users.<a href="./src/resources/zones/users.ts">list</a>(zoneID, { ...params }) -> UserListResponse</code>

## Members

Types:

- <code><a href="./src/resources/zones/members.ts">ZoneMember</a></code>
- <code><a href="./src/resources/zones/members.ts">ZoneRole</a></code>
- <code><a href="./src/resources/zones/members.ts">MemberListResponse</a></code>

Methods:

- <code title="get /zones/{zoneId}/members/{organizationUserId}">client.zones.members.<a href="./src/resources/zones/members.ts">retrieve</a>(organizationUserID, { ...params }) -> ZoneMember</code>
- <code title="patch /zones/{zoneId}/members/{organizationUserId}">client.zones.members.<a href="./src/resources/zones/members.ts">update</a>(organizationUserID, { ...params }) -> ZoneMember</code>
- <code title="get /zones/{zoneId}/members">client.zones.members.<a href="./src/resources/zones/members.ts">list</a>(zoneID, { ...params }) -> MemberListResponse</code>
- <code title="delete /zones/{zoneId}/members/{organizationUserId}">client.zones.members.<a href="./src/resources/zones/members.ts">delete</a>(organizationUserID, { ...params }) -> void</code>
- <code title="post /zones/{zoneId}/members">client.zones.members.<a href="./src/resources/zones/members.ts">add</a>(zoneID, { ...params }) -> ZoneMember</code>

## Secrets

Types:

- <code><a href="./src/resources/zones/secrets.ts">Secret</a></code>
- <code><a href="./src/resources/zones/secrets.ts">SecretPasswordFields</a></code>
- <code><a href="./src/resources/zones/secrets.ts">SecretTokenFields</a></code>
- <code><a href="./src/resources/zones/secrets.ts">SecretRetrieveResponse</a></code>
- <code><a href="./src/resources/zones/secrets.ts">SecretListResponse</a></code>

Methods:

- <code title="post /zones/{zone_id}/secrets">client.zones.secrets.<a href="./src/resources/zones/secrets.ts">create</a>(zoneID, { ...params }) -> Secret</code>
- <code title="get /zones/{zone_id}/secrets/{id}">client.zones.secrets.<a href="./src/resources/zones/secrets.ts">retrieve</a>(id, { ...params }) -> SecretRetrieveResponse</code>
- <code title="patch /zones/{zone_id}/secrets/{id}">client.zones.secrets.<a href="./src/resources/zones/secrets.ts">update</a>(id, { ...params }) -> Secret</code>
- <code title="get /zones/{zone_id}/secrets">client.zones.secrets.<a href="./src/resources/zones/secrets.ts">list</a>(zoneID, { ...params }) -> SecretListResponse</code>
- <code title="delete /zones/{zone_id}/secrets/{id}">client.zones.secrets.<a href="./src/resources/zones/secrets.ts">delete</a>(id, { ...params }) -> void</code>

## PolicySchemas

Types:

- <code><a href="./src/resources/zones/policy-schemas.ts">SchemaVersion</a></code>
- <code><a href="./src/resources/zones/policy-schemas.ts">SchemaVersionWithZoneInfo</a></code>
- <code><a href="./src/resources/zones/policy-schemas.ts">PolicySchemaListResponse</a></code>

Methods:

- <code title="get /zones/{zone_id}/policy-schemas/{version}">client.zones.policySchemas.<a href="./src/resources/zones/policy-schemas.ts">retrieve</a>(version, { ...params }) -> SchemaVersionWithZoneInfo</code>
- <code title="get /zones/{zone_id}/policy-schemas">client.zones.policySchemas.<a href="./src/resources/zones/policy-schemas.ts">list</a>(zoneID, { ...params }) -> PolicySchemaListResponse</code>
- <code title="patch /zones/{zone_id}/policy-schemas/{version}">client.zones.policySchemas.<a href="./src/resources/zones/policy-schemas.ts">setDefault</a>(version, { ...params }) -> SchemaVersionWithZoneInfo</code>

## Policies

Types:

- <code><a href="./src/resources/zones/policies/policies.ts">Policy</a></code>
- <code><a href="./src/resources/zones/policies/policies.ts">PolicyDraft</a></code>
- <code><a href="./src/resources/zones/policies/policies.ts">PolicyListResponse</a></code>

Methods:

- <code title="post /zones/{zone_id}/policies">client.zones.policies.<a href="./src/resources/zones/policies/policies.ts">create</a>(zoneID, { ...params }) -> Policy</code>
- <code title="get /zones/{zone_id}/policies/{policy_id}">client.zones.policies.<a href="./src/resources/zones/policies/policies.ts">retrieve</a>(policyID, { ...params }) -> Policy</code>
- <code title="patch /zones/{zone_id}/policies/{policy_id}">client.zones.policies.<a href="./src/resources/zones/policies/policies.ts">update</a>(policyID, { ...params }) -> Policy</code>
- <code title="get /zones/{zone_id}/policies">client.zones.policies.<a href="./src/resources/zones/policies/policies.ts">list</a>(zoneID, { ...params }) -> PolicyListResponse</code>
- <code title="delete /zones/{zone_id}/policies/{policy_id}">client.zones.policies.<a href="./src/resources/zones/policies/policies.ts">archive</a>(policyID, { ...params }) -> Policy</code>

### Versions

Types:

- <code><a href="./src/resources/zones/policies/versions.ts">PolicyVersion</a></code>
- <code><a href="./src/resources/zones/policies/versions.ts">VersionListResponse</a></code>

Methods:

- <code title="post /zones/{zone_id}/policies/{policy_id}/versions">client.zones.policies.versions.<a href="./src/resources/zones/policies/versions.ts">create</a>(policyID, { ...params }) -> PolicyVersion</code>
- <code title="get /zones/{zone_id}/policies/{policy_id}/versions/{version_id}">client.zones.policies.versions.<a href="./src/resources/zones/policies/versions.ts">retrieve</a>(versionID, { ...params }) -> PolicyVersion</code>
- <code title="get /zones/{zone_id}/policies/{policy_id}/versions">client.zones.policies.versions.<a href="./src/resources/zones/policies/versions.ts">list</a>(policyID, { ...params }) -> VersionListResponse</code>
- <code title="delete /zones/{zone_id}/policies/{policy_id}/versions/{version_id}">client.zones.policies.versions.<a href="./src/resources/zones/policies/versions.ts">archive</a>(versionID, { ...params }) -> PolicyVersion</code>

## PolicySets

Types:

- <code><a href="./src/resources/zones/policy-sets/policy-sets.ts">Attestation</a></code>
- <code><a href="./src/resources/zones/policy-sets/policy-sets.ts">AttestationStatement</a></code>
- <code><a href="./src/resources/zones/policy-sets/policy-sets.ts">PolicySet</a></code>
- <code><a href="./src/resources/zones/policy-sets/policy-sets.ts">PolicySetDraft</a></code>
- <code><a href="./src/resources/zones/policy-sets/policy-sets.ts">PolicySetManifest</a></code>
- <code><a href="./src/resources/zones/policy-sets/policy-sets.ts">PolicySetManifestEntry</a></code>
- <code><a href="./src/resources/zones/policy-sets/policy-sets.ts">PolicySetWithBinding</a></code>
- <code><a href="./src/resources/zones/policy-sets/policy-sets.ts">PolicySetListResponse</a></code>

Methods:

- <code title="post /zones/{zone_id}/policy-sets">client.zones.policySets.<a href="./src/resources/zones/policy-sets/policy-sets.ts">create</a>(zoneID, { ...params }) -> PolicySetWithBinding</code>
- <code title="get /zones/{zone_id}/policy-sets/{policy_set_id}">client.zones.policySets.<a href="./src/resources/zones/policy-sets/policy-sets.ts">retrieve</a>(policySetID, { ...params }) -> PolicySetWithBinding</code>
- <code title="patch /zones/{zone_id}/policy-sets/{policy_set_id}">client.zones.policySets.<a href="./src/resources/zones/policy-sets/policy-sets.ts">update</a>(policySetID, { ...params }) -> PolicySetWithBinding</code>
- <code title="get /zones/{zone_id}/policy-sets">client.zones.policySets.<a href="./src/resources/zones/policy-sets/policy-sets.ts">list</a>(zoneID, { ...params }) -> PolicySetListResponse</code>
- <code title="delete /zones/{zone_id}/policy-sets/{policy_set_id}">client.zones.policySets.<a href="./src/resources/zones/policy-sets/policy-sets.ts">archive</a>(policySetID, { ...params }) -> PolicySetWithBinding</code>

### Versions

Types:

- <code><a href="./src/resources/zones/policy-sets/versions.ts">PolicySetVersion</a></code>
- <code><a href="./src/resources/zones/policy-sets/versions.ts">VersionListResponse</a></code>
- <code><a href="./src/resources/zones/policy-sets/versions.ts">VersionListPoliciesResponse</a></code>

Methods:

- <code title="post /zones/{zone_id}/policy-sets/{policy_set_id}/versions">client.zones.policySets.versions.<a href="./src/resources/zones/policy-sets/versions.ts">create</a>(policySetID, { ...params }) -> PolicySetVersion</code>
- <code title="get /zones/{zone_id}/policy-sets/{policy_set_id}/versions/{version_id}">client.zones.policySets.versions.<a href="./src/resources/zones/policy-sets/versions.ts">retrieve</a>(versionID, { ...params }) -> PolicySetVersion</code>
- <code title="patch /zones/{zone_id}/policy-sets/{policy_set_id}/versions/{version_id}">client.zones.policySets.versions.<a href="./src/resources/zones/policy-sets/versions.ts">update</a>(versionID, { ...params }) -> PolicySetVersion</code>
- <code title="get /zones/{zone_id}/policy-sets/{policy_set_id}/versions">client.zones.policySets.versions.<a href="./src/resources/zones/policy-sets/versions.ts">list</a>(policySetID, { ...params }) -> VersionListResponse</code>
- <code title="delete /zones/{zone_id}/policy-sets/{policy_set_id}/versions/{version_id}">client.zones.policySets.versions.<a href="./src/resources/zones/policy-sets/versions.ts">archive</a>(versionID, { ...params }) -> PolicySetVersion</code>
- <code title="get /zones/{zone_id}/policy-sets/{policy_set_id}/versions/{version_id}/policies">client.zones.policySets.versions.<a href="./src/resources/zones/policy-sets/versions.ts">listPolicies</a>(versionID, { ...params }) -> VersionListPoliciesResponse</code>

# Organizations

Types:

- <code><a href="./src/resources/organizations/organizations.ts">Organization</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">PageInfoCursor</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">RoleScope</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">TokenResponse</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationListResponse</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationListIdentitiesResponse</a></code>
- <code><a href="./src/resources/organizations/organizations.ts">OrganizationListRolesResponse</a></code>

Methods:

- <code title="post /organizations">client.organizations.<a href="./src/resources/organizations/organizations.ts">create</a>({ ...params }) -> Organization</code>
- <code title="get /organizations/{organization_id}">client.organizations.<a href="./src/resources/organizations/organizations.ts">retrieve</a>(organizationID, { ...params }) -> Organization</code>
- <code title="patch /organizations/{organization_id}">client.organizations.<a href="./src/resources/organizations/organizations.ts">update</a>(organizationID, { ...params }) -> Organization</code>
- <code title="get /organizations">client.organizations.<a href="./src/resources/organizations/organizations.ts">list</a>({ ...params }) -> OrganizationListResponse</code>
- <code title="post /organizations/{organization_id}/token">client.organizations.<a href="./src/resources/organizations/organizations.ts">exchangeToken</a>(organizationID, { ...params }) -> TokenResponse</code>
- <code title="get /organizations/{organization_id}/identities">client.organizations.<a href="./src/resources/organizations/organizations.ts">listIdentities</a>(organizationID, { ...params }) -> OrganizationListIdentitiesResponse</code>
- <code title="get /organizations/{organization_id}/roles">client.organizations.<a href="./src/resources/organizations/organizations.ts">listRoles</a>(organizationID, { ...params }) -> OrganizationListRolesResponse</code>

## Users

Types:

- <code><a href="./src/resources/organizations/users.ts">OrganizationRole</a></code>
- <code><a href="./src/resources/organizations/users.ts">OrganizationStatus</a></code>
- <code><a href="./src/resources/organizations/users.ts">OrganizationUser</a></code>
- <code><a href="./src/resources/organizations/users.ts">UserListResponse</a></code>

Methods:

- <code title="get /organizations/{organization_id}/users/{user_id}">client.organizations.users.<a href="./src/resources/organizations/users.ts">retrieve</a>(userID, { ...params }) -> OrganizationUser</code>
- <code title="patch /organizations/{organization_id}/users/{user_id}">client.organizations.users.<a href="./src/resources/organizations/users.ts">update</a>(userID, { ...params }) -> OrganizationUser</code>
- <code title="get /organizations/{organization_id}/users">client.organizations.users.<a href="./src/resources/organizations/users.ts">list</a>(organizationID, { ...params }) -> UserListResponse</code>
- <code title="delete /organizations/{organization_id}/users/{user_id}">client.organizations.users.<a href="./src/resources/organizations/users.ts">delete</a>(userID, { ...params }) -> void</code>

## Invitations

Types:

- <code><a href="./src/resources/organizations/invitations.ts">Invitation</a></code>
- <code><a href="./src/resources/organizations/invitations.ts">InvitationStatus</a></code>
- <code><a href="./src/resources/organizations/invitations.ts">InvitationListResponse</a></code>

Methods:

- <code title="post /organizations/{organization_id}/invitations">client.organizations.invitations.<a href="./src/resources/organizations/invitations.ts">create</a>(organizationID, { ...params }) -> Invitation</code>
- <code title="get /organizations/{organization_id}/invitations">client.organizations.invitations.<a href="./src/resources/organizations/invitations.ts">list</a>(organizationID, { ...params }) -> InvitationListResponse</code>
- <code title="delete /organizations/{organization_id}/invitations/{invitation_id}">client.organizations.invitations.<a href="./src/resources/organizations/invitations.ts">delete</a>(invitationID, { ...params }) -> void</code>

## ServiceAccounts

Types:

- <code><a href="./src/resources/organizations/service-accounts/service-accounts.ts">ServiceAccount</a></code>
- <code><a href="./src/resources/organizations/service-accounts/service-accounts.ts">ServiceAccountListResponse</a></code>

Methods:

- <code title="post /organizations/{organization_id}/service-accounts">client.organizations.serviceAccounts.<a href="./src/resources/organizations/service-accounts/service-accounts.ts">create</a>(organizationID, { ...params }) -> ServiceAccount</code>
- <code title="get /organizations/{organization_id}/service-accounts/{service_account_id}">client.organizations.serviceAccounts.<a href="./src/resources/organizations/service-accounts/service-accounts.ts">retrieve</a>(serviceAccountID, { ...params }) -> ServiceAccount</code>
- <code title="patch /organizations/{organization_id}/service-accounts/{service_account_id}">client.organizations.serviceAccounts.<a href="./src/resources/organizations/service-accounts/service-accounts.ts">update</a>(serviceAccountID, { ...params }) -> ServiceAccount</code>
- <code title="get /organizations/{organization_id}/service-accounts">client.organizations.serviceAccounts.<a href="./src/resources/organizations/service-accounts/service-accounts.ts">list</a>(organizationID, { ...params }) -> ServiceAccountListResponse</code>
- <code title="delete /organizations/{organization_id}/service-accounts/{service_account_id}">client.organizations.serviceAccounts.<a href="./src/resources/organizations/service-accounts/service-accounts.ts">delete</a>(serviceAccountID, { ...params }) -> void</code>

### Credentials

Types:

- <code><a href="./src/resources/organizations/service-accounts/credentials.ts">ServiceAccountCredential</a></code>
- <code><a href="./src/resources/organizations/service-accounts/credentials.ts">CredentialCreateResponse</a></code>
- <code><a href="./src/resources/organizations/service-accounts/credentials.ts">CredentialListResponse</a></code>

Methods:

- <code title="post /organizations/{organization_id}/service-accounts/{service_account_id}/credentials">client.organizations.serviceAccounts.credentials.<a href="./src/resources/organizations/service-accounts/credentials.ts">create</a>(serviceAccountID, { ...params }) -> CredentialCreateResponse</code>
- <code title="get /organizations/{organization_id}/service-accounts/{service_account_id}/credentials/{credential_id}">client.organizations.serviceAccounts.credentials.<a href="./src/resources/organizations/service-accounts/credentials.ts">retrieve</a>(credentialID, { ...params }) -> ServiceAccountCredential</code>
- <code title="patch /organizations/{organization_id}/service-accounts/{service_account_id}/credentials/{credential_id}">client.organizations.serviceAccounts.credentials.<a href="./src/resources/organizations/service-accounts/credentials.ts">update</a>(credentialID, { ...params }) -> ServiceAccountCredential</code>
- <code title="get /organizations/{organization_id}/service-accounts/{service_account_id}/credentials">client.organizations.serviceAccounts.credentials.<a href="./src/resources/organizations/service-accounts/credentials.ts">list</a>(serviceAccountID, { ...params }) -> CredentialListResponse</code>
- <code title="delete /organizations/{organization_id}/service-accounts/{service_account_id}/credentials/{credential_id}">client.organizations.serviceAccounts.credentials.<a href="./src/resources/organizations/service-accounts/credentials.ts">delete</a>(credentialID, { ...params }) -> void</code>

## SSOConnection

Types:

- <code><a href="./src/resources/organizations/sso-connection.ts">SSOConnection</a></code>
- <code><a href="./src/resources/organizations/sso-connection.ts">SSOConnectionProtocol</a></code>

Methods:

- <code title="get /organizations/{organization_id}/sso-connection">client.organizations.ssoConnection.<a href="./src/resources/organizations/sso-connection.ts">retrieve</a>(organizationID, { ...params }) -> SSOConnection</code>
- <code title="patch /organizations/{organization_id}/sso-connection">client.organizations.ssoConnection.<a href="./src/resources/organizations/sso-connection.ts">update</a>(organizationID, { ...params }) -> SSOConnection</code>
- <code title="delete /organizations/{organization_id}/sso-connection">client.organizations.ssoConnection.<a href="./src/resources/organizations/sso-connection.ts">disable</a>(organizationID, { ...params }) -> void</code>
- <code title="post /organizations/{organization_id}/sso-connection">client.organizations.ssoConnection.<a href="./src/resources/organizations/sso-connection.ts">enable</a>(organizationID, { ...params }) -> SSOConnection</code>

# Invitations

Types:

- <code><a href="./src/resources/invitations.ts">InvitationRetrieveResponse</a></code>
- <code><a href="./src/resources/invitations.ts">InvitationAcceptResponse</a></code>

Methods:

- <code title="get /invitations/{token}">client.invitations.<a href="./src/resources/invitations.ts">retrieve</a>(token, { ...params }) -> InvitationRetrieveResponse</code>
- <code title="post /invitations/{token}/accept">client.invitations.<a href="./src/resources/invitations.ts">accept</a>(token, { ...params }) -> InvitationAcceptResponse</code>
