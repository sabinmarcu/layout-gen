import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    transition: theme.transitions.create(),
    width: '100vw',
    height: '100vh',
    overflowX: 'none',
    overflowY: 'auto',
    color: theme.palette.text.primary,
  },
}));

export const AppWrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      {children}
    </section>
  );
};

export default AppWrapper;
