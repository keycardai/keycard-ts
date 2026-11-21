// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import KeycardAPI from '@keycardai/api';

const client = new KeycardAPI({
  apiKey: 'My API Key',
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource policyEvaluations', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.zones.policyEvaluations.create('zone_id', {
      action: 'action',
      policy_source: {},
      principal_id: 'principal_id',
      principal_type: 'user',
      resource_id: 'resource_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.zones.policyEvaluations.create('zone_id', {
      action: 'action',
      policy_source: {
        manifest: {
          entries: [
            {
              policy_id: 'policy_id',
              policy_version_id: 'policy_version_id',
              sha: 'sha',
            },
          ],
          schema_version: 'schema_version',
        },
        policy: {
          policy_id: 'policy_id',
          schema_version: 'schema_version',
          version_id: 'version_id',
        },
        policy_set: { policy_set_id: 'policy_set_id', version_id: 'version_id' },
        raw: {
          cedar: 'cedar',
          schema_version: 'schema_version',
          validate: true,
        },
      },
      principal_id: 'principal_id',
      principal_type: 'user',
      resource_id: 'resource_id',
      acting_principal_id: 'acting_principal_id',
      authority_type: 'delegation',
      context: {
        claims: {
          acting_principal: {
            email: 'email',
            groups: ['string'],
            issuer_claims: { foo: 'bar' },
          },
          actor: {
            email: 'email',
            groups: ['string'],
            issuer_claims: { foo: 'bar' },
          },
          subject: {
            email: 'email',
            groups: ['string'],
            issuer_claims: { foo: 'bar' },
          },
        },
        scopes: ['string'],
        session_id: 'session_id',
      },
      subject_id: 'subject_id',
      subject_type: 'user',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('listRequests', async () => {
    const responsePromise = client.zones.policyEvaluations.listRequests('zone_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listRequests: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.zones.policyEvaluations.listRequests(
        'zone_id',
        {
          after: 'x',
          before: 'x',
          'expand[]': 'total_count',
          'filter[active_decision]': ['string'],
          'filter[authority_type]': ['string'],
          'filter[has_shadow]': true,
          'filter[principal_id]': ['string'],
          'filter[principal_type]': ['string'],
          'filter[resource_id]': ['string'],
          'filter[subject_id]': ['string'],
          'filter[subject_type]': ['string'],
          limit: 1,
          order: 'asc',
          'query[action]': ['x'],
          sort: 'created_at',
          'X-API-Version': 'X-API-Version',
          'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(KeycardAPI.NotFoundError);
  });
});
