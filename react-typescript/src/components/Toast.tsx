import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'state/configureStore';
import { ToastItem, ToastPosition, selectToasts, toastRemove } from 'state/toatsSlice';

interface Props {
  position: ToastPosition;
}
export const Toast: FC<Props> = ({ position }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasts);
  const [currToast, setCurrToast] = useState<ToastItem | undefined>(undefined);

  useEffect(() => {
    if (Object.entries(toasts).length && !currToast) {
      const key = Object.keys(toasts)[0];
      setCurrToast({ ...toasts[key] });
      setIsOpen(true);
      dispatch(toastRemove(toasts[key].id));
    } else if (toasts.length && currToast && isOpen) {
      setIsOpen(false);
    }
  }, [toasts, currToast, isOpen]);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (currToast) {
      dispatch(toastRemove(currToast.id));
      setIsOpen(false);
    }
  };

  const handleExited = () => {
    setCurrToast(undefined);
  };

  const getPos = (): SnackbarOrigin => {
    if (position === ToastPosition.bottomLeft) return { vertical: 'bottom', horizontal: 'left' };
    else if (position === ToastPosition.topLeft) return { vertical: 'top', horizontal: 'left' };
    else if (position === ToastPosition.topRight) return { vertical: 'top', horizontal: 'right' };
    else if (position === ToastPosition.bottomRight) return { vertical: 'bottom', horizontal: 'right' };
    else if (position === ToastPosition.topCenter) return { vertical: 'top', horizontal: 'center' };
    else if (position === ToastPosition.bottomCenter) return { vertical: 'bottom', horizontal: 'center' };

    return { vertical: 'bottom', horizontal: 'left' };
  };

  return (
    <Snackbar
      TransitionProps={{ onExited: handleExited }}
      key={currToast ? currToast.id : undefined}
      open={currToast ? isOpen : false}
      autoHideDuration={currToast ? currToast.autoDeleteTime : undefined}
      onClose={handleClose}
      anchorOrigin={getPos()}
    >
      <Alert onClose={handleClose} severity={currToast ? currToast.type : undefined} sx={{ width: '100%' }}>
        {currToast ? currToast.desc : undefined}
      </Alert>
    </Snackbar>
  );
};
