// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import KeycardAPI from 'keycard-ts';

const client = new KeycardAPI({
  apiKey: 'My API Key',
  username: 'My Username',
  password: 'My Password',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource credentials', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.organizations.serviceAccounts.credentials.create(
      'ab3def8hij2klm9opq5rst7uvw',
      { organization_id: 'x', name: 'name' },
    );
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
    const response = await client.organizations.serviceAccounts.credentials.create(
      'ab3def8hij2klm9opq5rst7uvw',
      {
        organization_id: 'x',
        name: 'name',
        description: 'description',
        'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.organizations.serviceAccounts.credentials.retrieve(
      'ab3def8hij2klm9opq5rst7uvw',
      { organization_id: 'x', service_account_id: 'ab3def8hij2klm9opq5rst7uvw' },
    );
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
    const response = await client.organizations.serviceAccounts.credentials.retrieve(
      'ab3def8hij2klm9opq5rst7uvw',
      {
        organization_id: 'x',
        service_account_id: 'ab3def8hij2klm9opq5rst7uvw',
        expand: ['permissions'],
        'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.organizations.serviceAccounts.credentials.update(
      'ab3def8hij2klm9opq5rst7uvw',
      { organization_id: 'x', service_account_id: 'ab3def8hij2klm9opq5rst7uvw' },
    );
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
    const response = await client.organizations.serviceAccounts.credentials.update(
      'ab3def8hij2klm9opq5rst7uvw',
      {
        organization_id: 'x',
        service_account_id: 'ab3def8hij2klm9opq5rst7uvw',
        description: 'description',
        name: 'name',
        'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.organizations.serviceAccounts.credentials.list(
      'ab3def8hij2klm9opq5rst7uvw',
      { organization_id: 'x' },
    );
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
    const response = await client.organizations.serviceAccounts.credentials.list(
      'ab3def8hij2klm9opq5rst7uvw',
      {
        organization_id: 'x',
        after: 'x',
        before: 'x',
        expand: ['permissions'],
        limit: 1,
        'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
    );
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.organizations.serviceAccounts.credentials.delete(
      'ab3def8hij2klm9opq5rst7uvw',
      { organization_id: 'x', service_account_id: 'ab3def8hij2klm9opq5rst7uvw' },
    );
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
    const response = await client.organizations.serviceAccounts.credentials.delete(
      'ab3def8hij2klm9opq5rst7uvw',
      {
        organization_id: 'x',
        service_account_id: 'ab3def8hij2klm9opq5rst7uvw',
        'X-Client-Request-ID': '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
    );
  });
});
