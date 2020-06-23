import {
  useMemo,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { useLocalStorage } from '@la/localstorage';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const useThemeProvider = ({
  light = {},
  dark = {},
} = {}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const defaultTheme = useMemo(
    () => (prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode, 'dark', 'light'],
  );

  const [themeName, setThemeName] = useLocalStorage('theme', defaultTheme);
  const changeTheme = useCallback(
    (t) => (['dark', 'light'].includes(t) && setThemeName(t)),
    [setThemeName],
  );
  const toggleTheme = useCallback(
    () => setThemeName((t) => (t === 'dark' ? 'light' : 'dark')),
    [setThemeName],
  );

  const theme = useMemo(
    () => createMuiTheme(
      themeName === 'dark' ? {
        ...dark,
        palette: { ...dark?.palette ?? {}, type: 'dark' },
      } : {
        ...light,
        palette: { ...light?.palette ?? {}, type: 'light' },
      },
    ),
    [themeName],
  );

  return {
    theme,
    themeName,
    changeTheme,
    toggleTheme,
  };
};

export const ThemeManagerContext = createContext('light');

export const useTheme = () => useContext(ThemeManagerContext);
