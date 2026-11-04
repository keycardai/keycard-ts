/**
 * How long a response asked the client to wait before retrying, in
 * milliseconds, from its `retry-after-ms` or `Retry-After` header.
 *
 * `retry-after-ms` wins when it parses to a non-zero number. `Retry-After`
 * may be seconds or an HTTP date; a date in the past gives a negative value.
 * Returns `undefined` when neither header is present or parseable.
 */
export function retryAfterMillis(headers: Headers | null | undefined): number | undefined {
  let timeoutMillis: number | undefined;

  // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
  const retryAfterMillisHeader = headers?.get('retry-after-ms');
  if (retryAfterMillisHeader) {
    const timeoutMs = parseFloat(retryAfterMillisHeader);
    if (!Number.isNaN(timeoutMs)) {
      timeoutMillis = timeoutMs;
    }
  }

  // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
  const retryAfterHeader = headers?.get('retry-after');
  if (retryAfterHeader && !timeoutMillis) {
    const timeoutSeconds = parseFloat(retryAfterHeader);
    if (!Number.isNaN(timeoutSeconds)) {
      timeoutMillis = timeoutSeconds * 1000;
    } else {
      const date = Date.parse(retryAfterHeader);
      if (!Number.isNaN(date)) {
        timeoutMillis = date - Date.now();
      }
    }
  }

  return timeoutMillis;
}
