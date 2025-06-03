import { createTheme } from '@mui/material/styles';
import { grey, red, teal, yellow } from '@mui/material/colors';
import type { Typography } from '@mui/material/styles/createTypography';

const typography = {
  fontFamily: [
    'system-ui',
    'Inter',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ].join(','),
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  button: {
    textTransform: 'none',
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
  h4: {
    fontWeight: 700,
  },
  subtitle2: {
    color: grey[600],
  },
};

export const lightTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
  typography: typography as Typography,
  palette: {
    mode: 'light',
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
    primary: {
      main: '#0052cc',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00b8d9',
      contrastText: '#ffffff',
    },
    error: {
      main: red[600],
    },
    warning: {
      main: yellow[700],
    },
    info: {
      main: teal[500],
    },
    success: {
      main: '#36b37e',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4f4f4f',
    },
  },
});

export const darkTheme = createTheme({
  typography: typography as Typography,
  palette: {
    mode: 'dark',
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    primary: {
      main: '#1f6feb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#79c0ff',
      contrastText: '#0d1117',
    },
    error: {
      main: red[300],
    },
    warning: {
      main: yellow[600],
    },
    info: {
      main: teal[200],
    },
    success: {
      main: '#3fb950',
    },
    text: {
      primary: '#f0f6fc',
      secondary: '#8b949e',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});
