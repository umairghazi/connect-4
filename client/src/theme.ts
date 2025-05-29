import { createTheme } from '@mui/material/styles';


const typography = {
  fontFamily: [
    'Inter',
    'system-ui',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
}

export const lightTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  typography,
  palette: {
    mode: 'light',
    background: {
      default: "#F5F5F5",
      paper: "offwhite"
    },
    primary: {
      main: "#9ED8DB",
    },
    secondary: {
      main: "#E9FFF9",
    },
    error: {
      main: "#D64045"
    },
    warning: {
      main: "#467599"
    },
    info: {
      main: "#E9FFF9"
    }
  },
});

export const darkTheme = createTheme({
  typography,
  palette: {
    mode: 'dark',
    background: {
      default: "#141115",
      paper: "black"
    },
    primary: {
      main: "#9ED8DB",
    },
    secondary: {
      main: "#E9FFF9",
    },
    error: {
      main: "#D64045"
    },
    warning: {
      main: "#467599"
    },
    info: {
      main: "#E9FFF9"
    }
  },
});
