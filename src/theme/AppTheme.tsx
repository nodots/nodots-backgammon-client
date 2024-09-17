import { createTheme } from '@mui/material'

export default createTheme({
  palette: {
    mode: 'dark',
  },
})

export const UTBoardTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'rgba(12, 12, 12)',
    },
    primary: {
      main: 'rgba(191, 87, 0, 0.5)',
      light: 'rgba(191, 87, 0, 0.25)',
      dark: 'rgba(191, 87, 0, 1)',
    },
    secondary: {
      main: 'rgba(0, 95, 134)',
      light: 'rgba(0, 169, 183)',
      dark: 'rgba(0, 95, 134)',
    },
  },
})
