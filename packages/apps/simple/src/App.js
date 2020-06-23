import React from 'react';

import { CombineProviders } from '@la/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppThemeProvider } from '@la/theme';

import { AppWrapper, Navbar } from '@la/layout';
import { Typography } from '@material-ui/core';

import { Settings } from './components/Settings';

import { Provider, Slot } from './states/title';
import routes from './config/routes';

function App() {
  return (
    <CombineProviders
      contexts={[
        [Router, { basename: process.env.NODE_ENV === 'production' ? '/layout-app' : '/' }],
        AppThemeProvider,
        Provider,
      ]}
    >
      <AppWrapper>
        <Navbar>
          <Typography variant="h4">
            <Slot />
          </Typography>
          <Settings />
        </Navbar>
        <Switch>
          {routes
            .filter(({ route }) => !!route)
            .map(({ id, Component, route }) => (
              <Route exact path={route} component={Component} key={id} />
            ))}
          {routes
            .filter(({ route }) => !route)
            .map(({ id, Component }) => (
              <Route path="/" component={Component} key={id} />
            ))}
        </Switch>
      </AppWrapper>
    </CombineProviders>
  );
}

export default App;
