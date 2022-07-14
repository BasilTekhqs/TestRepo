import {extendTheme} from 'native-base';
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
  config: {
    initialColorMode: 'light',
  },
};
export const theme = extendTheme({colors: newColorTheme});

export const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};
