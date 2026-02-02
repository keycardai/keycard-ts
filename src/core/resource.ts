// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { KeycardAPI } from '../client';

export abstract class APIResource {
  protected _client: KeycardAPI;

  constructor(client: KeycardAPI) {
    this._client = client;
  }
}
