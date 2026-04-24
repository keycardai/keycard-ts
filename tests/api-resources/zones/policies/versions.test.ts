// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import KeycardAPI from '@keycardai/api';

const client = new KeycardAPI({
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010',
});

describe('resource versions', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.zones.policies.versions.create('policy_id', { zone_id: 'zone_id', schema_version: 'schema_version' });
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
    const response = await client.zones.policies.versions.create('policy_id', {
    zone_id: 'zone_id',
    schema_version: 'schema_version',
    cedar_json: {},
    cedar_raw: 'cedar_raw',
    'X-API-Version': 'X-API-Version',
    'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
  });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.zones.policies.versions.retrieve('version_id', { zone_id: 'zone_id', policy_id: 'policy_id' });
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
    const response = await client.zones.policies.versions.retrieve('version_id', {
    zone_id: 'zone_id',
    policy_id: 'policy_id',
    format: 'cedar',
    'X-API-Version': 'X-API-Version',
    'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
  });
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.zones.policies.versions.list('policy_id', { zone_id: 'zone_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: required and optional params', async () => {
    const response = await client.zones.policies.versions.list('policy_id', {
    zone_id: 'zone_id',
    after: 'x',
    before: 'x',
    expand: ['total_count'],
    format: 'cedar',
    limit: 1,
    order: 'asc',
    sort: 'created_at',
    'X-API-Version': 'X-API-Version',
    'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
  });
  });

  // Mock server tests are disabled
  test.skip('archive: only required params', async () => {
    const responsePromise = client.zones.policies.versions.archive('version_id', { zone_id: 'zone_id', policy_id: 'policy_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('archive: required and optional params', async () => {
    const response = await client.zones.policies.versions.archive('version_id', {
    zone_id: 'zone_id',
    policy_id: 'policy_id',
    'X-API-Version': 'X-API-Version',
    'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
  });
  });
});
