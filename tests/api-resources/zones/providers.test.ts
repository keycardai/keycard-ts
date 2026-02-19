// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import KeycardAPI from 'keycard-api';

const client = new KeycardAPI({
  apiKey: 'My API Key',
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource providers', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.zones.providers.create('zoneId', { identifier: 'x', name: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.zones.providers.create('zoneId', {
      identifier: 'x',
      name: 'x',
      client_id: 'client_id',
      client_secret: 'client_secret',
      description: 'description',
      metadata: {},
      protocols: {
        oauth2: {
          authorization_endpoint: 'https://example.com',
          authorization_resource_enabled: true,
          authorization_resource_parameter: 'authorization_resource_parameter',
          code_challenge_methods_supported: ['string'],
          issuer: 'https://example.com',
          jwks_uri: 'https://example.com',
          registration_endpoint: 'https://example.com',
          scope_parameter: 'scope_parameter',
          scope_separator: 'scope_separator',
          scopes_supported: ['string'],
          token_endpoint: 'https://example.com',
          token_response_access_token_pointer: 'token_response_access_token_pointer',
        },
        openid: { userinfo_endpoint: 'https://example.com' },
      },
    });
  });

  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.zones.providers.retrieve('id', { zoneId: 'zoneId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.zones.providers.retrieve('id', { zoneId: 'zoneId' });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.zones.providers.update('id', { zoneId: 'zoneId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.zones.providers.update('id', {
      zoneId: 'zoneId',
      client_id: 'client_id',
      client_secret: 'client_secret',
      description: 'description',
      identifier: 'x',
      metadata: {},
      name: 'x',
      protocols: {
        oauth2: {
          authorization_endpoint: 'https://example.com',
          authorization_resource_enabled: true,
          authorization_resource_parameter: 'authorization_resource_parameter',
          code_challenge_methods_supported: ['string'],
          issuer: 'https://example.com',
          jwks_uri: 'https://example.com',
          registration_endpoint: 'https://example.com',
          scope_parameter: 'scope_parameter',
          scope_separator: 'scope_separator',
          scopes_supported: ['string'],
          token_endpoint: 'https://example.com',
          token_response_access_token_pointer: 'token_response_access_token_pointer',
        },
        openid: { userinfo_endpoint: 'https://example.com' },
      },
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.zones.providers.list('zoneId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.zones.providers.list(
        'zoneId',
        {
          after: 'x',
          before: 'x',
          cursor: 'cursor',
          'expand[]': 'total_count',
          identifier: 'identifier',
          limit: 1,
          slug: 'slug',
          type: 'external',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(KeycardAPI.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.zones.providers.delete('id', { zoneId: 'zoneId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.zones.providers.delete('id', { zoneId: 'zoneId' });
  });
});
