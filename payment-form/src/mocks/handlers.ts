import { http, HttpResponse } from 'msw';
import type { Account, AccountsResponse, ProcessPaymentRequest, ProcessPaymentResponse } from '../state/accountsApi';

const payerAccounts: Account[] = [
  {
    iban: 'LT307300010172619160',
    id: '1',
    balance: 1000.12
  },
  {
    iban: 'LT307300010172619161',
    id: '2',
    balance: 2.43
  },
  {
    iban: 'LT307300010172619162',
    id: '3',
    balance: -5.87
  }
];

export const handlers = [
  http.get('*v1/user/retrieve_accounts', async () => {
    const payerAccountsResponse: AccountsResponse = {
      status: 200,
      data: payerAccounts,
      error: {}
    };
    return new HttpResponse(JSON.stringify(payerAccountsResponse), { status: 200 });
  }),
  http.post('*v1/user/process_payment', async data => {
    const bodyText = await data.request.text();
    const paymentData: ProcessPaymentRequest = JSON.parse(bodyText);

    const specificPayment = payerAccounts.find(account => account.iban === paymentData.payerAccount);
    if (specificPayment) {
      specificPayment.balance -= paymentData.amount;
    }

    const payerAccountsResponse: ProcessPaymentResponse = {
      status: 200,
      data: {},
      error: {}
    };
    return new HttpResponse(JSON.stringify(payerAccountsResponse), { status: 200 });
  })
];
