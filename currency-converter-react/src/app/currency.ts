export interface Currency {
  label: string;
  value: CurrencyKey;
  limit: number;
}

export enum CurrencyKey {
  pln = 'pln',
  eur = 'eur',
  gbp = 'gbp',
  uah = 'uah'
}

export type CurrencyRecord = {
  [key in CurrencyKey]: Currency;
};

export const record: CurrencyRecord = {
  [CurrencyKey.pln]: { label: 'PLN - Polish Zloty (zł)', value: CurrencyKey.pln, limit: 20000 },
  [CurrencyKey.eur]: { label: 'EUR - Euro (€)', value: CurrencyKey.eur, limit: 5000 },
  [CurrencyKey.gbp]: { label: 'GBP - British Pound Sterling (£)', value: CurrencyKey.gbp, limit: 1000 },
  [CurrencyKey.uah]: { label: 'UAH - Ukrainian Hryvnia (₴)', value: CurrencyKey.uah, limit: 50000 }
};

export const currency: Array<Currency> = Object.values(record);
