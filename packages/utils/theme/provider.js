import React, { useMemo } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectTheme } from './core';

export const AppThemeProvider = ({ children }) => {
  const themeName = useSelector(selectTheme);
  const theme = useMemo(
    () => createMuiTheme({
      palette: {
        type: themeName,
      },
    }),
    [themeName],
  );
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
