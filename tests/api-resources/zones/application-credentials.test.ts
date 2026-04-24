// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import KeycardAPI from '@keycardai/api';

const client = new KeycardAPI({
  clientID: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010',
});

describe('resource applicationCredentials', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.zones.applicationCredentials.create('zoneId', {
    application_id: 'application_id',
    provider_id: 'provider_id',
    type: 'token',
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
    const response = await client.zones.applicationCredentials.create('zoneId', {
    application_id: 'application_id',
    provider_id: 'provider_id',
    type: 'token',
    subject: 'subject',
  });
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.zones.applicationCredentials.retrieve('id', { zoneId: 'zoneId' });
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
    const response = await client.zones.applicationCredentials.retrieve('id', { zoneId: 'zoneId' });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.zones.applicationCredentials.update('id', { zoneId: 'zoneId' });
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
    const response = await client.zones.applicationCredentials.update('id', {
    zoneId: 'zoneId',
    subject: 'subject',
    type: 'token',
  });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.zones.applicationCredentials.list('zoneId');
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
    await expect(client.zones.applicationCredentials.list('zoneId', {
    after: 'x',
    applicationId: 'applicationId',
    before: 'x',
    cursor: 'cursor',
    'expand[]': 'total_count',
    limit: 1,
    slug: 'slug',
  }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(KeycardAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.zones.applicationCredentials.delete('id', { zoneId: 'zoneId' });
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
    const response = await client.zones.applicationCredentials.delete('id', { zoneId: 'zoneId' });
  });
});
