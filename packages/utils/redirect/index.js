import { useEffect, useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const useRedirect = () => {
  const history = useHistory();
  const location = useLocation();
  const [ran, setRan] = useState(false);
  const redirect = useMemo(
    () => {
      if (location) {
        const rSet = location.search
          .substr(1)
          .split('&')
          .map((it) => it.split('='))
          .find(([it]) => it === 'r');
        return rSet ? rSet[1] : null;
      }
      return undefined;
    },
    [location.search],
  );
  useEffect(
    () => {
      if (history && redirect && !ran) {
        setRan(true);
        history.replace(redirect);
      }
    },
    [history, redirect, ran, setRan],
  );
};

export const RedirectComponent = () => {
  useRedirect();
  return null;
};

export default useRedirect;
