import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { defaultAmount, defaultFrom, defaultTo } from 'app/constant';
import { CurrencyKey } from 'app/currency';
import { Converter } from 'components/converter/Converter';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'state/configureStore';
import { disableLoading, enableLoading } from 'state/pageSlice';
import { useFetchRatesQuery } from 'state/ratesApi';
import { loadPage, selectFromAmount, selectToAmount } from 'state/ratesSlice';
import { handleError } from 'utils/functionUtils';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const fromAmount = useAppSelector(selectFromAmount);
  const toAmount = useAppSelector(selectToAmount);

  const [conversionParams, setConversionParams] = useState<{
    from: CurrencyKey;
    to: CurrencyKey;
    amount: number;
  }>({
    from: defaultFrom.value,
    to: defaultTo.value,
    amount: defaultAmount
  });
  const [convertInitiated, setConvertInitiated] = useState<boolean>(false);
  const [skip, setSkip] = useState<boolean>(true);

  const {
    data: dataRates,
    isFetching: isFetchingRates,
    error: errorRates
  } = useFetchRatesQuery(conversionParams, {
    skip: skip
  });

  const handleConvert = (from: CurrencyKey, to: CurrencyKey, amount: number) => {
    setConversionParams({ from, to, amount });
    setConvertInitiated(true);
    setSkip(true);
  };

  const handleErrorInternal = (error: FetchBaseQueryError | SerializedError) => {
    dispatch(disableLoading());
    handleError(error);
  };

  useEffect(() => {
    if (convertInitiated) setSkip(false);
  }, [conversionParams, convertInitiated]);

  useEffect(() => {
    if (dataRates) dispatch(loadPage(dataRates));
  }, [dataRates]);

  useEffect(() => {
    if (isFetchingRates) dispatch(enableLoading());
    else dispatch(disableLoading());
  }, [isFetchingRates]);

  useEffect(() => {
    if (errorRates) {
      handleErrorInternal(errorRates);
    }
  }, [errorRates]);

  return (
    <>
      <Converter
        handleConvertCallBack={handleConvert}
        convertInitiated={convertInitiated}
        fromAmount={fromAmount}
        toAmount={toAmount}
        isLoading={isFetchingRates}
      />
    </>
  );
};
