import { retryAfterMillis } from '@keycardai/api/lib/retry-after';

describe('retryAfterMillis', () => {
  const now = Date.parse('2026-01-01T00:00:00Z');

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(now);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('reads retry-after-ms', () => {
    expect(retryAfterMillis(new Headers({ 'retry-after-ms': '1500' }))).toBe(1500);
  });

  test('prefers retry-after-ms over retry-after', () => {
    expect(retryAfterMillis(new Headers({ 'retry-after-ms': '250', 'retry-after': '10' }))).toBe(250);
  });

  test('reads retry-after in seconds', () => {
    expect(retryAfterMillis(new Headers({ 'retry-after': '5' }))).toBe(5000);
  });

  test('reads retry-after as an HTTP date', () => {
    expect(retryAfterMillis(new Headers({ 'retry-after': 'Thu, 01 Jan 2026 00:00:07 GMT' }))).toBe(7000);
  });

  test('falls back to retry-after when retry-after-ms is unparseable', () => {
    expect(retryAfterMillis(new Headers({ 'retry-after-ms': 'soon', 'retry-after': '2' }))).toBe(2000);
  });

  test('returns undefined without a usable header', () => {
    expect(retryAfterMillis(undefined)).toBeUndefined();
    expect(retryAfterMillis(new Headers())).toBeUndefined();
    expect(retryAfterMillis(new Headers({ 'retry-after': 'soon' }))).toBeUndefined();
  });
});
