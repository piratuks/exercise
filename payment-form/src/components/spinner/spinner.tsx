import { Box, CircularProgress } from '@mui/material';
import type { FC } from 'react';
import { themeColors } from '../theme/theme';

export const SpinnerOverlay: FC = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: themeColors.overlay.white60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1500
    }}
  >
    <CircularProgress size={48} />
  </Box>
);
