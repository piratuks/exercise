import { Alert, Snackbar } from '@mui/material';
import { useState, type FC } from 'react';

export interface ToastProps {
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
  variant?: 'filled' | 'outlined' | 'standard';
  autoHideDuration?: number;
  onClose?: () => void;
  offset?: number;
}

export const Toast: FC<ToastProps> = ({
  message,
  severity,
  vertical = 'bottom',
  horizontal = 'left',
  variant = 'filled',
  autoHideDuration = 3000,
  offset = 0,
  onClose = () => {}
}) => {
  const [open, setOpen] = useState(true);
  const handleClose = (_: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar
      sx={{
        transform: vertical === 'top' ? `translateY(${offset}px)` : `translateY(-${offset}px)`,
        transition: 'transform 0.3s ease'
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
    >
      <Alert variant={variant} onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
