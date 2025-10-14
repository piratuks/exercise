import type { ProcessPaymentRequest } from '../state/accountsApi';

export const isPaymentFormData = (data: unknown): data is ProcessPaymentRequest => {
  if (typeof data !== 'object' || data === null) return false;

  const record = data as Record<string, unknown>;
  return (
    typeof record.payerAccount === 'string' &&
    typeof record.receiverAccount === 'string' &&
    typeof record.amount === 'number' &&
    typeof record.receiver === 'string' &&
    typeof record.purpose === 'string'
  );
};
