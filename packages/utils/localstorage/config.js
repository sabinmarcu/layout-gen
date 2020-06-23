/* eslint-disable no-underscore-dangle */

let _shouldLog = process.env.NODE_ENV === 'development';
export const enableLog = () => { _shouldLog = true; };
export const disableLog = () => { _shouldLog = false; };
export const shouldLog = () => _shouldLog;

let _prefix = 'app';
export const setPrefix = (value) => { _prefix = `${value}`; };
export const prefix = () => _prefix;

// eslint-disable-next-line no-console
export const groupCollapsed = (...args) => _shouldLog && console.groupCollapsed(...args);
// eslint-disable-next-line no-console
export const groupEnd = (...args) => _shouldLog && console.groupEnd(...args);
// eslint-disable-next-line no-console
export const log = (...args) => _shouldLog && console.log(...args);

export const logGroup = (
  message,
  key,
  ...rest
) => {
  groupCollapsed(`${message} %c${key}`, 'color: grey; font-size: 0.9em');
  rest.forEach((it) => {
    if (Array.isArray(it)) {
      log(...it);
    } else {
      log(it);
    }
  });
  groupEnd();
};

const makeMatcher = (pf) => new RegExp(['^', _prefix, ':', pf].join(''));
export const makeKey = (key, pf) => [_prefix, [pf, key].join('')].join(':');
export const isKey = (key, pf) => key.match(makeMatcher(pf));
export const stripKey = (key, pf) => key.replace(makeMatcher(pf), '');

export const logState = (message, key, value) => {
  logGroup(
    message,
    key,
    [`Key: %c${key}`, 'color: blue; text-decoration: underline'],
    [
      `LocalStorage Key: %c${[_prefix, key].join(':')}`,
      'color: blue; text-decoration: underline',
    ],
    ['Value:', value],
  );
};
