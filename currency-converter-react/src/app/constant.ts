import { CurrencyKey, record } from './currency';

export const routes = {
  home: `/home`
};

export const defaultAmount = 1;
export const defaultFrom = record[CurrencyKey.eur];
export const defaultTo = record[CurrencyKey.gbp];
