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
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.zones.policies.draft.retrieve('policy_id', { zone_id: 'zone_id' });
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
    const response = await client.zones.policies.draft.retrieve('policy_id', {
      zone_id: 'zone_id',
      'expand[]': 'user',
      format: 'cedar',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.zones.policies.draft.delete('policy_id', { zone_id: 'zone_id' });
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
    const response = await client.zones.policies.draft.delete('policy_id', {
      zone_id: 'zone_id',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('upsert: only required params', async () => {
    const responsePromise = client.zones.policies.draft.upsert('policy_id', {
      zone_id: 'zone_id',
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
    const response = await client.zones.policies.draft.upsert('policy_id', {
      zone_id: 'zone_id',
      schema_version: 'schema_version',
      format: 'cedar',
      validate_cedar: true,
      cedar_json: {},
      cedar_raw: 'cedar_raw',
      'X-API-Version': 'X-API-Version',
      'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
