import CircularProgress from '@mui/material/CircularProgress';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Block = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  isLoading?: boolean;
  configFlag?: boolean;
}
export const Loader: FC<Props> = ({ isLoading = false, configFlag = false }) => {
  const [timerState, setTimerState] = useState(false);
  const timerVar = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!configFlag) {
      if (isLoading) {
        timerVar.current = setTimeout(() => {
          setTimerState(true);
        }, 1000);
      } else if (!isLoading) {
        if (timerVar.current) clearTimeout(timerVar.current);
        setTimerState(false);
      }
    }
  }, [isLoading, configFlag]);

  if (!timerState && !configFlag) return null;

  return (
    <Block>
      <CircularProgress />
    </Block>
  );
};
