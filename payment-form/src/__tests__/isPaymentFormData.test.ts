import { describe, expect, it } from 'vitest';
import { isPaymentFormData } from '../shared/isPaymentFormData';
import type { ProcessPaymentRequest } from '../state/accountsApi';

describe('isPaymentFormData', () => {
  it('returns true for a valid ProcessPaymentRequest', () => {
    const validData: ProcessPaymentRequest = {
      payerAccount: '12345',
      receiverAccount: '67890',
      amount: 100,
      receiver: 'John Doe',
      purpose: 'Invoice payment'
    };

    expect(isPaymentFormData(validData)).toBe(true);
  });

  it('returns false if data is null', () => {
    expect(isPaymentFormData(null)).toBe(false);
  });

  it('returns false if data is not an object', () => {
    expect(isPaymentFormData('string')).toBe(false);
    expect(isPaymentFormData(123)).toBe(false);
    expect(isPaymentFormData(true)).toBe(false);
  });

  it('returns false if any required field is missing', () => {
    const missingField = {
      payerAccount: '12345',
      receiverAccount: '67890',
      amount: 100,
      receiver: 'John Doe'
    };
    expect(isPaymentFormData(missingField)).toBe(false);
  });

  it('returns false if any field has the wrong type', () => {
    const wrongType = {
      payerAccount: '12345',
      receiverAccount: 67890,
      amount: '100',
      receiver: 'John Doe',
      purpose: 'Invoice payment'
    };
    expect(isPaymentFormData(wrongType)).toBe(false);
  });
});
