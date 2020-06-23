import React from 'react';

import { Button as ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useTheme } from '@la/theme';

import { Brightness4, Brightness7 } from '@material-ui/icons';

const Button = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
}))(ButtonBase);

export const Settings = () => {
  const { themeName, toggleTheme } = useTheme();
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
