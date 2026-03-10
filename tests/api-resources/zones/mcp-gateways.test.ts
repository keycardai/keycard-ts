// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import KeycardAPI from '@keycardai/api';

const client = new KeycardAPI({
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mcpGateways', () => {
  // Mock server tests are disabled
  test.skip('createMcpServer: only required params', async () => {
    const responsePromise = client.zones.mcpGateways.createMcpServer('applicationId', {
      zoneId: 'zoneId',
      downstream: {},
      upstream: { identifier: 'x', name: 'x' },
      upstream_provider: { identifier: 'x', name: 'x' },
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
  test.skip('createMcpServer: required and optional params', async () => {
    const response = await client.zones.mcpGateways.createMcpServer('applicationId', {
      zoneId: 'zoneId',
      downstream: { slug: 'slug' },
      upstream: { identifier: 'x', name: 'x' },
      upstream_provider: { identifier: 'x', name: 'x' },
    });
  });
});
