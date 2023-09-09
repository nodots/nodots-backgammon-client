import { createTheme } from '@mui/material'

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#a8afc7',
      main: '#575f90',
      dark: '#333355',
      contrastText: '#fff',
    },
    secondary: {
      light: '#004f42',
      main: '#00988b',
      dark: '#004f42',
      contrastText: '#000',
    },
  }

})