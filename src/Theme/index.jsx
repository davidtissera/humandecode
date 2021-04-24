import { createMuiTheme } from '@material-ui/core';
import orange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },
  },
  typography: {
    h5: {
      fontWeight: 700,
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
      },
      fontSize: '2rem',
    },
    body1: {
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
      },
      fontSize: '1rem',
    }
  }
});

export default theme;
