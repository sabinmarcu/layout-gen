/* eslint-disable import/no-extraneous-dependencies, import/no-dynamic-require, global-require */

const {
  override,
  getBabelLoader,
} = require('customize-cra');
const { addReactRefresh } = require('customize-cra-react-refresh');

const path = require('path');
const fs = require('fs');
const glob = require('glob');

const findRoot = (dir = __dirname) => {
  const pkgPath = path.resolve(dir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = require(pkgPath);
    if (pkg.workspaces) {
      return dir;
    }
  }
  return findRoot(path.dirname(dir));
};

const getInstalledWorkspaceDependencies = (dir = __dirname) => {
  const pkg = require(path.resolve(dir, 'package.json'));
  const prefix = pkg.name.match(/^(@[^/]+)\//)[1];
  const packages = [
    pkg.dependencies || {},
    pkg.devDependencies || {},
  ]
    .map(Object.keys)
    .flat()
    .filter((it) => it.startsWith(prefix));
  const rootDir = findRoot(dir);
  const { workspaces } = require(
    path.join(rootDir, 'package.json'),
  );
  const projectDirs = workspaces
    .map((ws) => glob.sync(ws, { cwd: rootDir })
      .filter((it) => it.endsWith('package.json')))
    .flat()
    .map((it) => path.resolve(rootDir, it))
    .map((it) => ({ path: it, name: require(it).name }));
  const deps = projectDirs
    .filter(({ name }) => packages.includes(name))
    .map(({ path: p }) => path.dirname(p));
  return deps;
};

const addRootBabelConfig = (dir = __dirname) => (config) => {
  const rootDir = findRoot(dir);
  getBabelLoader(config).options = require(
    path.resolve(
      rootDir,
      'babel.config.js',
    ),
  );
  return config;
};

const addInstalledWorkspaceDependencies = (dir = __dirname) => (config) => {
  const jsRules = config.module.rules.filter(
    (r) => !!r.oneOf,
  )[0].oneOf.filter((it) => `${it.test}`.match(/js/) && !!it.include)[0];
  jsRules.include = [
    jsRules.include,
    getInstalledWorkspaceDependencies(dir),
  ].flat();
  return config;
};

module.exports = override(
  addRootBabelConfig(),
  addInstalledWorkspaceDependencies(),
  addReactRefresh(),
);
