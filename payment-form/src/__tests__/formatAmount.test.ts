import { describe, expect, it } from 'vitest';
import { formatAmount } from '../shared/formatAmount';

describe('formatAmount', () => {
  it('formats number for English locale', () => {
    const result = formatAmount(1234.5, 'en');

    expect(result).toBe('1,234.50');
  });

  it('formats number for Lithuanian locale', () => {
    const result = formatAmount(1234.5, 'lt');

    expect(result).toBe('1 234,50');
  });

  it('formats integer numbers correctly', () => {
    const resultEn = formatAmount(1000, 'en');
    const resultLt = formatAmount(1000, 'lt');

    expect(resultEn).toBe('1,000.00');
    expect(resultLt).toBe('1 000,00');
  });
});
