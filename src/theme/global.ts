import { createTheme } from '@mui/material/styles'
const bktValues = {
  xs: 0,
  sm: 600,
  md: 950,
  lg: 1280,
  xl: 1920
}
const colorPrimaryMain = '#7FA1CF'
const colorSecondaryMain = '#B913EE'
export const theme = createTheme({
  palette: {
    primary: {
      main: colorPrimaryMain,
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: colorSecondaryMain,
    },
  },
  breakpoints: {
    values: {
      xs: bktValues.xs,
      sm: bktValues.sm,
      md: bktValues.md,
      lg: bktValues.lg,
      xl: bktValues.xl
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          // minHeight: '100dvh',
          // width: '100vw',
          backgroundColor: '#000',
        },
        '#root': {
          margin: '0',
          padding: '0',
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
        },
        main: {
          width: '100%',
          maxHeight: '100dvh',
          height: '100dvh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }
      },
    },
  },
}
)