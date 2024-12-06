import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0000',
      light: '#ff4444',
      dark: '#cc0000',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#111111',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#ff0000',
          border: 0,
          borderRadius: 8,
          color: 'white',
          height: 40,
          padding: '0 20px',
          '&:hover': {
            background: '#cc0000',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#111111',
          borderRadius: 16,
          border: '1px solid rgba(255, 0, 0, 0.2)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#111111',
          borderRadius: 16,
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h6: {
      color: '#ffffff',
      fontWeight: 500,
    },
    body1: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
});
