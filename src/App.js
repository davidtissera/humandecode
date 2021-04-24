import { ThemeProvider } from '@material-ui/core';
import './App.css';
import MoviesContainer from './Movies/MoviesContainer';
import theme from './Theme';

function App() {
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <MoviesContainer />
    </ThemeProvider>
  );
}

export default App;
