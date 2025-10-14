export const parseAmount = (value: string, locale: 'en' | 'lt'): number | undefined => {
  if (typeof value !== 'string' || !value.trim()) return undefined;

  const formatter = new Intl.NumberFormat(locale);
  const parts = formatter.formatToParts(1000.1);

  const groupSymbol = parts.find(p => p.type === 'group')?.value ?? ',';
  const decimalSymbol = parts.find(p => p.type === 'decimal')?.value ?? '.';

  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const cleanedGroups = value.replace(new RegExp(escapeRegex(groupSymbol), 'g'), '');

  const lastIndex = cleanedGroups.lastIndexOf(decimalSymbol);
  const cleaned =
    lastIndex >= 0
      ? cleanedGroups.substring(0, lastIndex) + '.' + cleanedGroups.substring(lastIndex + 1)
      : cleanedGroups;

  const numStr = cleaned.replace(/\s/g, '');
  if (!/^-?\d+(\.\d+)?$/.test(numStr)) return undefined;
  const num = parseFloat(numStr);

  return isNaN(num) ? undefined : num;
};
