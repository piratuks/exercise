import { defaultAmount, defaultFrom, defaultTo } from 'app/constant';
import { Currency, CurrencyKey } from 'app/currency';
import { useEffect, useState } from 'react';

export const useConverter = (
  handleConvertCallBack: (from: CurrencyKey, to: CurrencyKey, amount: number) => void,
  fromAmount: number | null,
  toAmount: number | null
) => {
  const [from, setFrom] = useState<Currency>(defaultFrom);
  const [to, setTo] = useState<Currency>(defaultTo);
  const [amount, setAmount] = useState<number | null>(null);
  const [amountF, setFromAmount] = useState<number | null>(defaultAmount);
  const [amountT, setToAmount] = useState<number | null>(null);
  const [activeInput, setActiveInput] = useState<'from' | 'to'>('from');
  const [btnClicked, setBtnclicked] = useState<boolean>(false);

  useEffect(() => {
    if (activeInput === 'from' && fromAmount !== null) {
      updateAmounts(fromAmount, from, toAmount);
    } else if (activeInput === 'to' && toAmount !== null) {
      updateAmounts(toAmount, from, fromAmount);
    }
  }, [fromAmount, toAmount, activeInput]);

  useEffect(() => {
    if (btnClicked) handleConvert();
  }, [from, to, btnClicked]);

  useEffect(() => {
    if (btnClicked) handleConvert();
  }, [amount, from, to, activeInput, btnClicked]);

  const updateAmounts = (amountValue: number | null, currency: Currency, otherAmount: number | null) => {
    const processed = processedValidationConvert(amountValue, currency);
    if (!processed) {
      setFromAmount(amountValue);
      setToAmount(otherAmount);
    }
  };

  const validateLimit = (amount: number | null, currency: Currency) => {
    const limit = currency.limit;
    if (amount && amount > limit) {
      return { hint: `Limit is ${limit}`, amount: limit };
    }
    return { hint: null, amount: amount };
  };

  const processedValidationConvert = (amount: number | null, currency: Currency) => {
    const validatedData = validateLimit(amount, currency);
    if (validatedData.hint) {
      setActiveInput('from');
      setAmount(validatedData.amount);
      return true;
    }
    return false;
  };

  const handleConvert = () => {
    if (amount !== null) {
      const [fromKey, toKey] = activeInput === 'from' ? [from.value, to.value] : [to.value, from.value];
      handleConvertCallBack(fromKey, toKey, amount);
      setAmount(null);
    }
  };

  const handleAmountChange = (data: number, inputType: 'from' | 'to') => {
    if (data > 0) {
      setActiveInput(inputType);
      if (inputType === 'from') {
        if (!processedValidationConvert(data, from)) {
          setFromAmount(data);
          setAmount(data);
        }
      } else {
        setToAmount(data);
        setAmount(data);
      }
    }
  };

  const handleFromAmountChange = (data: number) => handleAmountChange(data, 'from');

  const handleToAmountChange = (data: number) => handleAmountChange(data, 'to');

  const handleConvertClick = () => {
    setAmount(amountF);
    setBtnclicked(true);
  };

  const handleCurrencyChange = (data: Currency, type: 'from' | 'to') => {
    setActiveInput('from');
    if (type === 'from') {
      setFrom(data);
    } else {
      setTo(data);
    }
    setAmount(amountF);
  };

  const handleFromChange = (data: Currency) => handleCurrencyChange(data, 'from');

  const handleToChange = (data: Currency) => handleCurrencyChange(data, 'to');

  const switchValues = () => {
    setActiveInput('from');

    const tempKey = { ...from };
    setFrom(to);
    setTo(tempKey);

    if (btnClicked) {
      const tempVal = amountF;
      updateAmounts(amountT, to, tempVal);
    }
  };

  return {
    from,
    to,
    amountF,
    amountT,
    handleFromChange,
    handleToChange,
    switchValues,
    handleConvertClick,
    handleFromAmountChange,
    handleToAmountChange
  };
};
