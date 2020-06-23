const ctx = require.context('../screens', false, /\.js/);
const files = ctx.keys();
const routes = files.reduce(
  (prev, it) => {
    const { default: Component, route } = ctx(it);
    const id = it.match(/\/([^.]+)\.js$/)[1];
    return [prev, { id, Component, route }].flat();
  },
  [],
);

export default routes;
