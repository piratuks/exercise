import { Loader } from 'components/Loader';
import { Toast } from 'components/Toast';
import { FC, useEffect } from 'react';
import { isSerializedError } from 'state/apiError';
import { useFetchConfigurationQuery } from 'state/configurationApi';
import { configurationLoaded, selectIsconfigurationInitialized } from 'state/configurationSlice';
import { useAppDispatch, useAppSelector } from 'state/configureStore';
import { disableLoading, enableLoading, selectIsLoading } from 'state/pageSlice';
import { ToastPosition, ToastType, toastAdd } from 'state/toatsSlice';
import { styled } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { AppHeader } from './AppHeader';
import { AppRoutes } from './AppRoutes';

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 1320px;
  min-height: 60%;
  border-bottom: 1px solid rgb(222, 226, 230);
  margin-top: 100px;
  margin-right: auto;
  margin-left: auto;
`;

export const App: FC = () => {
  const { data, isFetching, error } = useFetchConfigurationQuery();
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsconfigurationInitialized);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isFetching) dispatch(enableLoading());
    else dispatch(disableLoading());
  }, [isFetching]);

  useEffect(() => {
    if (data) dispatch(configurationLoaded(data));
  }, [data]);

  if (error) {
    let msg = 'Something happened durring request';
    if (isSerializedError(error) && error.message) {
      msg = error.message;
    }
    dispatch(
      toastAdd({
        id: uuidv4(),
        desc: msg,
        autoDeleteTime: 6000,
        type: ToastType.error
      })
    );
  }

  if (isFetching || !isInitialized) return <Loader configFlag={true} />;

  return (
    <>
      <Loader isLoading={isLoading} />;
      <AppHeader />
      <Container>
        <AppRoutes />
      </Container>
      <Toast position={ToastPosition.bottomLeft} />
    </>
  );
};
