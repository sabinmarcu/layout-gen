import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import {
  logGroup,
  logState,
  makeKey,
  stripKey,
  isKey,
} from './config';

export const processKeys = ({
  keys,
  pattern,
  expand,
}) => {
  const list = keys
    .filter((it) => isKey(it))
    .map((it) => stripKey(it))
    .filter((it) => it.match(pattern));
  if (expand) {
    return list.reduce(
      (prev, it) => {
        const key = makeKey(it);
        const val = localStorage.getItem(key);
        let ret = null;
        try {
          logState('⚙ LocalStorageList Get Item', key, val);
          ret = JSON.parse(val);
        } catch {
          logState('❌ Could not parse LS data', key, val);
        }
        return {
          ...prev,
          [it]: ret,
        };
      },
      { },
    );
  }
  return list;
};

export const processValue = (
  lsKeys,
  defaultValue,
) => (lsKeys && (Array.isArray(lsKeys) ? lsKeys.length > 0 : true)
  ? lsKeys
  : defaultValue);

export const useLocalStorageList = (
  rawPattern,
  {
    defaultValue = null,
    expand = false,
  } = {},
) => {
  const patternIsRegExp = useMemo(
    () => rawPattern instanceof RegExp,
    [rawPattern],
  );
  const pattern = useMemo(
    () => (patternIsRegExp ? pattern : new RegExp(`^${rawPattern}`)),
    [patternIsRegExp, rawPattern],
  );
  const [initialLoad, setInitialLoad] = useState(false);
  const [value, setValue] = useState(null);
  const oldKeys = useRef([]);
  const update = useCallback(
    (logText) => {
      const lsKeys = processKeys({ keys: Object.keys(localStorage).sort(), pattern, expand });
      oldKeys.current = lsKeys;
      if (!logText) {
        logState('⚙ LocalStorageList Get', rawPattern, lsKeys);
      } else {
        logGroup(
          logText,
          rawPattern,
          [`Old Value: %c${JSON.stringify(oldKeys.current)}`, 'color: red; text-decoration: underline'],
          [`New Value: %c${JSON.stringify(lsKeys)}`, 'color: green; text-decoration: underline'],
        );
      }
      setValue(processValue(lsKeys, !logText ? defaultValue : undefined));
    },
    [setValue, defaultValue, pattern, expand],
  );
  useEffect(() => {
    if (!initialLoad) {
      setInitialLoad(true);
      update();
    }
  }, [setValue, initialLoad, pattern, rawPattern, defaultValue, expand]);
  useEffect(() => {
    const handler = ({
      storageArea,
      key: k,
    }) => {
      const isValidKey = isKey(k);
      const isLocalStorage = storageArea === localStorage;
      const isRightKey = stripKey(k).match(pattern);
      if (!(isLocalStorage && isValidKey && isRightKey)) {
        return undefined;
      }
      update('⚙ LocalStorage Event');
      return undefined;
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [update, pattern, rawPattern]);
  const addItem = useCallback(
    (key) => {
      if (patternIsRegExp) {
        return undefined;
      }
      const k = makeKey(key, rawPattern);
      logState('⚙ LocalStorageList Add', k, {});
      localStorage.setItem(k, '{}');
      update();
      return undefined;
    },
    [patternIsRegExp, update],
  );
  const removeItem = useCallback(
    (key) => {
      if (patternIsRegExp) {
        return undefined;
      }
      const k = makeKey(key);
      logState('⚙ LocalStorageList Remove', k, {});
      localStorage.removeItem(k);
      update();
      return undefined;
    },
    [patternIsRegExp, update],
  );
  return { value, addItem, removeItem };
};

export default useLocalStorageList;
