export const formatAmount = (amount: number, locale: 'en' | 'lt') => {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'lt-LT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};
