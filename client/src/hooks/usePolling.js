import { useEffect, useRef, useCallback } from 'react';

export const usePolling = (callback, interval = 3000, enabled = true) => {
  const savedCallback = useRef();
  const intervalId = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      return;
    }

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    intervalId.current = setInterval(tick, interval);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [interval, enabled]);

  const stopPolling = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  }, []);

  const startPolling = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    intervalId.current = setInterval(tick, interval);
  }, [interval]);

  return { stopPolling, startPolling };
};

export default usePolling;
