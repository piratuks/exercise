import { describe, expect, it } from 'vitest';
import { parseAmount } from '../shared/parseAmount';

describe('parseAmount', () => {
  it('parses plain numbers correctly', () => {
    expect(parseAmount('1234', 'en')).toBe(1234);
    expect(parseAmount('1234', 'lt')).toBe(1234);
  });

  it('parses numbers with decimal correctly', () => {
    expect(parseAmount('1234.56', 'en')).toBe(1234.56);
    expect(parseAmount('1234,56', 'lt')).toBe(1234.56);
  });

  it('parses numbers with group separators', () => {
    expect(parseAmount('1,234.56', 'en')).toBe(1234.56);
    expect(parseAmount('1 234,56', 'lt')).toBe(1234.56);
  });

  it('handles numbers without decimals but with group separators', () => {
    expect(parseAmount('1,234', 'en')).toBe(1234);
    expect(parseAmount('1 234', 'lt')).toBe(1234);
  });

  it('returns undefined for empty or whitespace-only strings', () => {
    expect(parseAmount('', 'en')).toBeUndefined();
    expect(parseAmount('   ', 'lt')).toBeUndefined();
  });

  it('returns undefined for non-numeric strings', () => {
    expect(parseAmount('abc', 'en')).toBeUndefined();
    expect(parseAmount('12ab34', 'lt')).toBeUndefined();
  });

  it('ignores extra spaces in numbers', () => {
    expect(parseAmount(' 1,234.56 ', 'en')).toBe(1234.56);
    expect(parseAmount(' 1 234,56 ', 'lt')).toBe(1234.56);
  });

  it('handles numbers without group separator but with decimal', () => {
    expect(parseAmount('1234.56', 'en')).toBe(1234.56);
    expect(parseAmount('1234,56', 'lt')).toBe(1234.56);
  });
});
