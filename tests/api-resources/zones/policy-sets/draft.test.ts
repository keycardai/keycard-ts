// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import KeycardAPI from '@keycardai/api';

const client = new KeycardAPI({
  apiKey: 'My API Key',
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource draft', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.zones.policySets.draft.create('policy_set_id', { zone_id: 'zone_id' });
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
    const response = await client.zones.policySets.draft.create('policy_set_id', {
      zone_id: 'zone_id',
      base_version_id: 'base_version_id',
      description: 'description',
      manifest: {
        entries: [
          {
            policy_id: 'policy_id',
            policy_version_id: 'policy_version_id',
            sha: 'sha',
          },
        ],
      },
      name: 'name',
      schema_version: 'schema_version',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.zones.policySets.draft.retrieve('policy_set_id', { zone_id: 'zone_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.zones.policySets.draft.retrieve('policy_set_id', {
      zone_id: 'zone_id',
      'expand[]': 'user',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.zones.policySets.draft.update('policy_set_id', { zone_id: 'zone_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.zones.policySets.draft.update('policy_set_id', {
      zone_id: 'zone_id',
      description: 'description',
      manifest_operations: [
        {
          op: 'set',
          policy_id: 'policy_id',
          policy_version_id: 'policy_version_id',
        },
      ],
      name: 'name',
      schema_version: 'schema_version',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.zones.policySets.draft.delete('policy_set_id', { zone_id: 'zone_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.zones.policySets.draft.delete('policy_set_id', {
      zone_id: 'zone_id',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('listPolicies: only required params', async () => {
    const responsePromise = client.zones.policySets.draft.listPolicies('policy_set_id', {
      zone_id: 'zone_id',
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
  test.skip('listPolicies: required and optional params', async () => {
    const response = await client.zones.policySets.draft.listPolicies('policy_set_id', {
      zone_id: 'zone_id',
      after: 'x',
      before: 'x',
      'expand[]': 'total_count',
      format: 'cedar',
      limit: 1,
      order: 'asc',
      sort: 'created_at',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('upsert: only required params', async () => {
    const responsePromise = client.zones.policySets.draft.upsert('policy_set_id', {
      zone_id: 'zone_id',
      manifest: { entries: [{ policy_id: 'policy_id', policy_version_id: 'policy_version_id' }] },
      schema_version: 'schema_version',
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
  test.skip('upsert: required and optional params', async () => {
    const response = await client.zones.policySets.draft.upsert('policy_set_id', {
      zone_id: 'zone_id',
      manifest: {
        entries: [
          {
            policy_id: 'policy_id',
            policy_version_id: 'policy_version_id',
            sha: 'sha',
          },
        ],
      },
      schema_version: 'schema_version',
      description: 'description',
      name: 'name',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
