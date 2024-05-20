import { alpha } from '@mui/material/styles';


export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

export const primary = {
  lighter: '#518dff',
  light: '#1667b1',
  main: '#003a6d',
  dark: '#002a54',
  darker: '#001a3c',
  contrastText: '#FFFFFF',
};

export const secondary = {
  lighter: '#fbb3e9',
  light: '#c85fbf',
  main: '#8a2683',
  dark: '#571652',
  darker: '#310b26',
  contrastText: '#FFFFFF',
};

export const info = {
  lighter: '#6effec',
  light: '#00d2c3',
  main: '#00a69b',
  dark: '#006b6a',
  darker: '#003e3e',
  contrastText: '#FFFFFF',
};

export const success = {
  lighter: '#9effb8',
  light: '#51ff8a',
  main: '#00d45e',
  dark: '#00a63a',
  darker: '#006d17',
  contrastText: '#FFFFFF',
};

export const warning = {
  lighter: '#ffeb85',
  light: '#ffd441',
  main: '#fcbf00',
  dark: '#c58e00',
  darker: '#905c00',
  contrastText: grey[800],
};

export const error = {
  lighter: '#ff9d9d',
  light: '#ff6767',
  main: '#ff2e2e',
  dark: '#d40e0e',
  darker: '#930c0c',
  contrastText: '#FFFFFF',
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  action,
};

export function palette() {
  return {
    ...base,
    mode: 'dark',
    text: {
      primary: grey[100],
      secondary: grey[300],
      disabled: grey[500],
    },
    background: {
      //paper: '#212B36',
      // default: '#161C24',
      //default: '#181818',
       default:'#000000',
     // neutral: '#454F5B',
    },
    action: {
      ...base.action,
      active: grey[300],
    },
  };
}
