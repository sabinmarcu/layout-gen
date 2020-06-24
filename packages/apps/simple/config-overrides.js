// eslint-disable-next-line max-len
/* eslint-disable no-param-reassign, import/no-extraneous-dependencies, import/no-dynamic-require, global-require */

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

const getPackage = (dir = __dirname) => require(path.resolve(dir, 'package.json'));
const getPackagePrefix = (dir = __dirname) => getPackage(dir).name.match(/^(@[^/]+)\//)[1];
const getPackageDependencies = (dir = __dirname) => {
  const pkg = getPackage(dir);
  const prefix = getPackagePrefix(dir);
  const packages = [
    pkg.dependencies || {},
    pkg.devDependencies || {},
  ]
    .map(Object.keys)
    .flat()
    .filter((it) => it.startsWith(prefix));
  return packages;
};
const getWorkspaces = (dir = __dirname) => {
  const rootDir = findRoot(dir);
  const { workspaces } = require(
    path.join(rootDir, 'package.json'),
  );
  return workspaces;
};

const getInstalledWorkspaceDependencies = (dir = __dirname) => {
  const rootDir = findRoot(dir);
  const packages = getPackageDependencies(dir);
  const workspaces = getWorkspaces(dir);
  const projectDirs = workspaces
    .map((ws) => glob.sync(ws, { cwd: rootDir })
      .filter((it) => it.endsWith('package.json')))
    .flat()
    .map((it) => path.resolve(rootDir, it))
    .map((it) => ({ path: it, name: require(it).name, meta: require(it) }));
  const deps = projectDirs
    .filter(({ name }) => packages.includes(name));
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

const setToEnv = (config, obj) => {
  const plugin = config.plugins.find((it) => it.constructor.name === 'DefinePlugin');
  plugin.definitions['process.env'] = {
    ...plugin.definitions['process.env'],
    ...obj,
  };
};

const addRootDirToEnv = (dir = __dirname) => (config) => {
  const rootDir = findRoot(dir);

  setToEnv(config, {
    ROOT_DIR: JSON.stringify(`${path.relative(__dirname, rootDir)}/packages`),
  });

  return config;
};

const addInstalledWorkspaceDependencies = (dir = __dirname) => (config) => {
  const jsRules = config.module.rules.filter(
    (r) => !!r.oneOf,
  )[0].oneOf.filter((it) => `${it.test}`.match(/js/) && !!it.include)[0];
  jsRules.include = [
    jsRules.include,
    getInstalledWorkspaceDependencies(dir)
      .map(({ path: p }) => path.dirname(p)),
  ].flat();
  return config;
};

module.exports = override(
  addRootBabelConfig(),
  addInstalledWorkspaceDependencies(),
  addReactRefresh(),
  addRootDirToEnv(),
);
