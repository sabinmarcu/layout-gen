import { createSlice } from '@reduxjs/toolkit';

const states = ['dark', 'light'];
const toggleTheme = (theme) => states[(states.indexOf(theme) + 1) % states.length];

const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';

export const store = createSlice({
  name: 'theme',
  initialState: defaultTheme,
  reducers: {
    toggle: (state) => toggleTheme(state),
  },
});

export const localStorage = true;
export const { toggle } = store.actions;
export const selectTheme = (state) => state[store.name];

export default store;
