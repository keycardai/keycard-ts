// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import KeycardAPI from '@keycardai/api';

const client = new KeycardAPI({
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010',
});

describe('resource users', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.organizations.users.retrieve('ab3def8hij2klm9opq5rst7uvw', { organization_id: 'x' });
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
    const response = await client.organizations.users.retrieve('ab3def8hij2klm9opq5rst7uvw', {
    organization_id: 'x',
    expand: ['permissions'],
    'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
  });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.organizations.users.update('ab3def8hij2klm9opq5rst7uvw', { organization_id: 'x' });
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
    const response = await client.organizations.users.update('ab3def8hij2klm9opq5rst7uvw', {
    organization_id: 'x',
    role: 'org_admin',
    status: 'active',
    'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
  });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.organizations.users.list('x');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.organizations.users.list('x', {
    after: 'x',
    before: 'x',
    expand: ['permissions'],
    limit: 1,
    role: 'org_admin',
    'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(KeycardAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.organizations.users.delete('ab3def8hij2klm9opq5rst7uvw', { organization_id: 'x' });
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
    const response = await client.organizations.users.delete('ab3def8hij2klm9opq5rst7uvw', { organization_id: 'x', 'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });
  });
});
