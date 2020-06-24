import React, { useCallback } from 'react';

import { Button as ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Brightness4, Brightness7 } from '@material-ui/icons';

const {
  theme: {
    selectTheme,
    toggle,
  },
} = require('../../config/redux');

const Button = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
}))(ButtonBase);

export const Settings = () => {
  const themeName = useSelector(selectTheme);
  const dispatch = useDispatch();
  const toggleTheme = useCallback(
    () => dispatch(toggle()),
    [dispatch, toggle],
  );
  return (
    <div>
      <Button onClick={toggleTheme}>
        {themeName === 'dark'
          ? <Brightness4 />
          : <Brightness7 />}
      </Button>
    </div>
  );
};

export default Settings;
