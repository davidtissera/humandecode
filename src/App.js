import { CssBaseline, ThemeProvider } from '@material-ui/core';
import MoviesContainer from './Movies/MoviesContainer';
import theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MoviesContainer />
    </ThemeProvider>
  );
}

export default App;
