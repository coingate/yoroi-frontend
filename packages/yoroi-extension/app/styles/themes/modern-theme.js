// @flow
import { createTheme } from '@mui/material/styles';
import { RubikFonts } from '../fonts';

export const modernTheme: Object = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ${RubikFonts}
      `,
    },
  },
  palette: {
    primary: {
      main: 'hsl(232, 100%, 64%)',
    },
    secondary: {
      main: 'hsl(167, 80%, 45%)',
    },
    error: {
      main: 'hsl(345, 100%, 54%)',
    },
    warning: {
      main: 'hsl(38, 92%, 55%)',
    },
    grey: {
      '50': 'hsl(201, 22%, 95%)',
      '100': 'hsl(216, 26%, 93%)',
      '200': 'hsl(219, 23%, 89%)',
      '300': 'hsl(222, 19%, 81%)',
      '400': 'hsl(221, 17%, 70%)',
      '500': 'hsl(221, 12%, 59%)',
      '600': 'hsl(221, 10%, 47%)',
      '700': 'hsl(228, 15%, 34%)',
      '800': 'hsl(229, 20%, 28%)',
      '900': 'hsl(228, 22%, 18%)',
    },
  },
  typography: {
    fontFamily: '"Rubik", sans-serif',
  },
});