import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import z, { type ZodTypeAny } from 'zod/v3';
import type { FieldDefinition } from '../components/form/form';
import { formatAmount } from '../shared/formatAmount';
import { parseAmount } from '../shared/parseAmount';
import type { Account } from './accountsApi';
import type { RootState } from './configureStore';

export interface AccountsState {
  accounts: Account[];
  selectAccount?: Account;
  locale: 'en' | 'lt';
}
const initialState: AccountsState = {
  accounts: [],
  selectAccount: undefined,
  locale: 'en'
};

export const accountsSlice = createSlice({
  name: 'accountsSlice',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
    setLocale: (state, action: PayloadAction<'en' | 'lt'>) => {
      state.locale = action.payload;
    },
    setSelectedAccounts: (state, action: PayloadAction<string>) => {
      state.selectAccount = state.accounts.find(account => account.iban === action.payload);
    },
    reset: state => {
      state.accounts = [];
      state.selectAccount = undefined;
    }
  }
});

export const selectState = (state: RootState) => state.accountsSlice;
export const selectAccounts = createSelector(selectState, state => state.accounts);
export const selectLocale = createSelector(selectState, state => state.locale);
export const selectAccountsFields = createSelector(selectState, state => {
  return [
    {
      name: 'payerAccount',
      label: 'Payer Account',
      type: 'select',
      options: state.accounts.map(account => ({
        label: `${account.iban} (Balance: ${formatAmount(account.balance, state.locale)} EUR)`,
        value: account.iban,
        highlight: account.balance <= 0
      }))
    },
    {
      name: 'amount',
      label: 'Amount (€)',
      type: 'text',
      disabled: !state.selectAccount || state.selectAccount.balance <= 0,
      helperText: state.selectAccount && state.selectAccount.balance <= 0 ? 'Not enough balance' : undefined,
      format: (value: unknown) => {
        if (value !== '') {
          const rawValue = parseAmount(value as string, state.locale);
          if (rawValue != null) return formatAmount(rawValue, state.locale);
        }

        return value;
      }
    },
    {
      name: 'receiverAccount',
      label: 'Receiver Account',
      type: 'text'
    },
    {
      name: 'receiver',
      label: 'Receiver',
      type: 'text'
    },
    {
      name: 'purpose',
      label: 'Purpose',
      type: 'text'
    }
  ] as FieldDefinition[];
});
export const selectAccountsShema = createSelector(selectState, state => {
  const schema = z.object({
    payerAccount: z.string().nonempty('Payer account is required'),
    amount: z.preprocess(
      (value: unknown) => {
        return parseAmount(value as string, state.locale);
      },
      z
        .number({
          required_error: 'Amount is required',
          invalid_type_error: 'Amount must be a number'
        })
        .min(0.01, 'Amount must be greater than 0.01')
        .max(state.selectAccount?.balance ?? Infinity, 'Exceeds available balance')
    ),
    receiverAccount: z.string().nonempty('Receiver account is required'),
    receiver: z.string().min(1, 'Receiver is required').max(70, 'Receiver is too long'),
    purpose: z
      .string()
      .min(1, 'Purpose is required')
      .min(3, 'Purpose must have at least 3 characters')
      .max(135, 'Purpose must have at most 135 characters')
  });

  return schema as ZodTypeAny;
});

export const { setAccounts, setLocale, setSelectedAccounts, reset } = accountsSlice.actions;

export const accountsReducer = accountsSlice.reducer;
