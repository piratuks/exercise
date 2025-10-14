import { Box, Card, CardContent, MenuItem, Select, Typography, type SelectChangeEvent } from '@mui/material';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useRef, type FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { z, type ZodTypeAny } from 'zod/v3';
import { DynamicForm, type DynamicFormValues } from '../../components/form/form';
import { themeColors } from '../../components/theme/theme';
import { handleError } from '../../shared/handleError';
import { isPaymentFormData } from '../../shared/isPaymentFormData';
import { useGetUserAccountsDataQuery, useProcessPaymentMutation } from '../../state/accountsApi';
import {
  selectAccountsFields,
  selectAccountsShema,
  selectLocale,
  setAccounts,
  setLocale,
  setSelectedAccounts
} from '../../state/accountsSlice';
import { useAppDispatch, useAppSelector } from '../../state/configureStore';
import { useLazyValidateIbanQuery } from '../../state/ibanApi';
import { addToast, disableLoading, enableLoading } from '../../state/pageSlice';

export const PaymentForm: FC = () => {
  const { data: dataAccounts, error: errorAccounts, isFetching: isLoadingAccounts } = useGetUserAccountsDataQuery({});
  const [triggerIbanCheck, { error: errorIban }] = useLazyValidateIbanQuery();
  const [
    processPayment,
    {
      data: processPaymentData,
      error: errorProcessPayment,
      isSuccess: isSuccessProcessPayment,
      isError: isErrorProcessPayment,
      isLoading: isLoadingProcessPayment
    }
  ] = useProcessPaymentMutation();

  const dispatch = useAppDispatch();
  const formRef = useRef<UseFormReturn>(undefined);
  const fields = useAppSelector(selectAccountsFields);
  const schema = useAppSelector(selectAccountsShema);
  const locale = useAppSelector(selectLocale);

  const extendReceiverAccount = (schema: ZodTypeAny) => {
    if (!(schema instanceof z.ZodObject)) throw new Error('Expected a ZodObject');

    return schema.extend({
      receiverAccount: schema.shape.receiverAccount.refine(
        async (value: string) => {
          if (!value) return false;
          try {
            const res = await triggerIbanCheck(value).unwrap();
            return res.valid;
          } catch {
            return false;
          }
        },
        { message: 'Invalid IBAN' }
      )
    });
  };

  const dynamicSchema = extendReceiverAccount(schema);

  const executeHandleError = useCallback(
    (err: FetchBaseQueryError | SerializedError) => {
      const data = handleError(err);
      dispatch(
        addToast({
          message: data.msg,
          severity: 'error'
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!formRef.current) return;
    const { watch } = formRef.current;
    const subscription = watch((values: DynamicFormValues) => {
      const payerAccount = values['payerAccount'];
      if (payerAccount) dispatch(setSelectedAccounts(payerAccount as string));
    });
    return () => subscription.unsubscribe();
  }, [fields, dispatch]);

  useEffect(() => {
    if (isLoadingAccounts) {
      dispatch(enableLoading());
    } else {
      dispatch(disableLoading());
    }
  }, [isLoadingAccounts, dispatch]);

  useEffect(() => {
    if (isLoadingProcessPayment) {
      dispatch(enableLoading());
    } else {
      dispatch(disableLoading());
    }
  }, [isLoadingProcessPayment, dispatch]);

  // IBAN request loading state, but propably best to keep it out as it will trigger spinner flicker
  // Maybe if we want to have indication for loading of API request it should be on field or other way
  // Global spinner here would be useless
  // useEffect(() => {
  //   if (isLoadingIban) {
  //     dispatch(enableLoading());
  //   } else {
  //     dispatch(disableLoading());
  //   }
  // }, [isLoadingIban, dispatch]);

  useEffect(() => {
    if (dataAccounts) {
      dispatch(setAccounts(dataAccounts.data));
    }
  }, [dataAccounts, dispatch]);

  useEffect(() => {
    if (errorIban) {
      executeHandleError(errorIban);
    }
  }, [errorIban, executeHandleError]);

  useEffect(() => {
    if (errorAccounts) {
      executeHandleError(errorAccounts);
    }
  }, [errorAccounts, executeHandleError]);

  useEffect(() => {
    if (errorProcessPayment && isErrorProcessPayment) {
      executeHandleError(errorProcessPayment);
    }
  }, [errorProcessPayment, isErrorProcessPayment, executeHandleError]);

  useEffect(() => {
    if (processPaymentData && isSuccessProcessPayment) {
      dispatch(
        addToast({
          message: 'Payment has been processed.',
          severity: 'success'
        })
      );
      formRef.current?.reset();
    }
  }, [processPaymentData, isSuccessProcessPayment, dispatch]);

  const handleChangeLocale = (event: SelectChangeEvent<'en' | 'lt'>) => {
    dispatch(setLocale(event.target.value));
  };

  const handleSubmit = (data: unknown) => {
    if (isPaymentFormData(data)) {
      processPayment({
        ...data
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: themeColors.grey[100],
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Typography variant="h5">Payments Form</Typography>
        <Select value={locale} onChange={handleChangeLocale} size="small">
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="lt">LT</MenuItem>
        </Select>
      </Box>

      <Card elevation={3} sx={{ maxWidth: 500, width: '100%', p: 2 }}>
        <CardContent>
          <DynamicForm
            submitLabel={'Send'}
            ref={formRef}
            schema={dynamicSchema}
            fields={fields}
            locale={locale}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
