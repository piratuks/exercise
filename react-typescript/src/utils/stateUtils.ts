export const getEnumValue = (passedValue: string | null, data: { [s: number]: string }) => {
  if (passedValue) {
    const match = Object.entries(data).find(([_key, value]) => value === passedValue);
    if (match) {
      const [_key, value] = match;
      return value;
    }
  }

  return undefined;
};
