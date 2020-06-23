import {
  useState,
  useEffect,
} from 'react';

import {
  logGroup,
  logState,
  makeKey,
  isKey,
} from './config';

export const useLocalStorage = (
  key,
  defaultValue,
) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [value, setValue] = useState(undefined);
  useEffect(() => {
    if (!initialLoad) {
      setInitialLoad(true);
      const val = localStorage.getItem(makeKey(key));
      if (val) {
        try {
          logState('⚙ LocalStorage Get', key, val);
          setValue(JSON.parse(val));
        } catch {
          logState('❌ Could not parse LS data', key, val);
          setValue(defaultValue);
        }
      } else {
        setValue(defaultValue);
      }
    }
  }, [initialLoad, key, defaultValue]);
  useEffect(() => {
    if (!initialLoad) {
      return undefined;
    }
    let shouldUpdate = true;
    try {
      const existingValue = localStorage.getItem(makeKey(key));
      if (existingValue && JSON.parse(existingValue) === value) {
        shouldUpdate = false;
      }
    } finally {
      if (shouldUpdate) {
        if (value === null) {
          logState('⚙ LocalStorage Remove', key, value);
          localStorage.removeItem(makeKey(key));
        } else {
          logState('⚙ LocalStorage Set', key, value);
          localStorage.setItem(makeKey(key), JSON.stringify(value));
        }
      }
    }
    return undefined;
  }, [key, value]);
  useEffect(() => {
    const handler = ({
      storageArea,
      key: k,
      oldValue,
      newValue,
    }) => {
      const isValidKey = isKey(k);
      const isLocalStorage = storageArea === localStorage;
      const isRightKey = k === makeKey(key);
      if (!(isLocalStorage && isValidKey && isRightKey)) {
        return undefined;
      }
      try {
        const [ov, nv] = [
          JSON.parse(oldValue),
          JSON.parse(newValue),
        ];
        logGroup(
          '⚙ LocalStorage Event',
          key,
          [`Old Value: %c${ov}`, 'color: red; text-decoration: underline'],
          [`New Value: %c${nv}`, 'color: green; text-decoration: underline'],
        );
        setValue(nv);
      } catch (e) {
        logState('❌ Could not parse LS data from Event', key, newValue);
      }
      return undefined;
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [setValue, key]);
  return [value, setValue];
};

export default useLocalStorage;
