import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ThemeManagerContext, useThemeProvider } from './core';

export const AppThemeProvider = ({ children }) => {
  const data = useThemeProvider();
  return (
    <ThemeManagerContext.Provider value={data}>
      <ThemeProvider theme={data.theme}>
        {children}
      </ThemeProvider>
    </ThemeManagerContext.Provider>
  );
};

export default AppThemeProvider;
