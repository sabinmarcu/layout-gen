/* eslint-disable import/no-dynamic-require, global-require */
const {
  getDefaultMiddleware,
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} = require('@reduxjs/toolkit');
const persistState = require('redux-localstorage');

const ctx = require.context(`../../${process.env.ROOT_DIR}`, true, /\/(index\.js|package\.json)$/);
const keys = ctx.keys();

const stores = keys.filter((it) => it.endsWith('package.json'))
  .map((it) => [it, ctx(it)])
  .filter(([, { role }]) => role && role === 'redux-store')
  .reduce((prev, [path, { name }]) => ({
    ...prev,
    [name.match(/([^/]+)$/)[1]]: ctx(path.replace('package.json', 'index.js')),
  }), {});

Object.entries(stores)
  .forEach(([name, mod]) => {
    module.exports[name] = mod;
  });

const store = createStore(
  combineReducers(Object.entries(stores)
    .reduce(
      (prev, [name, mod]) => ({
        ...prev,
        [name]: mod.store.reducer,
      }),
      {},
    )),
  (
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose
  )(
    ...getDefaultMiddleware().map((it) => applyMiddleware(it)),
    persistState(['theme']),
  ),
);

module.exports.stores = stores;
module.exports.store = store;
