import React from 'react';

import {
  AppBar as AppBarBase,
  Toolbar,
  Container as ContainerBase,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const AppBar = withStyles((theme) => ({
  colorPrimary: {
    background: theme.palette.type === 'dark'
      ? theme.palette.background.default
      : theme.palette.primary.dark,
  },
}))(AppBarBase);

const Container = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})(ContainerBase);

export const Navbar = ({ children }) => (
  <AppBar position="static">
    <Toolbar>
      <Container>
        {children}
      </Container>
    </Toolbar>
  </AppBar>
);

export default Navbar;
