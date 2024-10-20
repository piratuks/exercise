import { FC, useEffect, useRef, useState } from 'react';

import './loader.css';

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
    <div className="loaderBlock">
      <span className="loader" />
    </div>
  );
};
