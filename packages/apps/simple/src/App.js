import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { RedirectComponent } from '@la/redirect';
import { AppThemeProvider } from '@la/theme';
import { CombineProviders } from '@la/context';

import { AppWrapper, Navbar } from '@la/layout';
import { Typography } from '@material-ui/core';

import { Settings } from './components/Settings';
import { Provider, Slot } from './states/title';
import routes from './config/routes';
import { store } from './config/redux';

function App() {
  return (
    <CombineProviders
      contexts={[
        [Router, { basename: process.env.NODE_ENV === 'production' ? '/layout-gen/simple' : '/' }],
        [ReduxProvider, { store }],
        AppThemeProvider,
        Provider,
      ]}
    >
      <RedirectComponent />
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
