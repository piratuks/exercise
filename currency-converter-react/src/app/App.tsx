import { Loader } from 'components/loader/Loader';
import { FC, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { isSerializedError } from 'state/apiError';
import { useFetchConfigurationQuery } from 'state/configurationApi';
import { configurationLoaded, selectIsconfigurationInitialized } from 'state/configurationSlice';
import { useAppDispatch, useAppSelector } from 'state/configureStore';
import { disableLoading, enableLoading, selectIsLoading } from 'state/pageSlice';
import { showErrorToast } from 'utils/functionUtils';
import { AppRoutes } from './AppRoutes';

import './app.css';

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

  useEffect(() => {
    if (error) {
      dispatch(disableLoading());
      let msg = 'Something happened durring request';
      if (isSerializedError(error) && error.message) {
        msg = error.message;
      }
      showErrorToast(msg);
    }
  }, [error]);

  if (isFetching || !isInitialized) return <Loader configFlag={true} />;

  return (
    <>
      <Loader isLoading={isLoading} />
      <section className="pageSection">
        <section className="content">{<AppRoutes />}</section>
      </section>
      <ToastContainer />
    </>
  );
};
