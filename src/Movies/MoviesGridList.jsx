import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Slide } from '@material-ui/core';
import MovieDetail from './MovieDetail';
import MoviePoster from './MoviePoster';

const MoviesGridList = ({ movies }) => {
  const [showMovies, setShowMovies] = useState(true);
  const [movie, setMovie] = useState({});
  const [showMovieDetail, setShowMovieDetail] = useState(false);

  const handleClickMovie = (movie) => {
    setMovie(movie);
    setShowMovies(false);
    setShowMovieDetail(true);
  };

  const handleClickGoBackToMovies = () => {
    setShowMovies(true);
    setShowMovieDetail(false);
  };

  return (
    <>
      <Slide in={showMovies} timeout={1200}>
        <Grid container spacing={2}>
          {movies.map((movie, idx) =>
            movie.poster_path && showMovies ? (
              <Grid
                item
                container
                xs={6}
                sm={4}
                md={3}
                justify="center"
                alignItems="center"
                key={`${movie.title}${idx}`}
              >
                <MoviePoster
                  movie={movie}
                  CardProps={{ onClick: () => handleClickMovie(movie) }}
                  clickable
                />
              </Grid>
            ) : null
          )}
        </Grid>
      </Slide>
      {showMovieDetail && (
        <Slide in={showMovieDetail} timeout={700} direction="left">
          <Grid container>
            <Grid item xs={12}>
              <MovieDetail
                movie={movie}
                handleClickGoBackToMovies={handleClickGoBackToMovies}
              />
            </Grid>
          </Grid>
        </Slide>
      )}
    </>
  );
};

MoviesGridList.propTypes = {
  movies: PropTypes.array,
};

export default MoviesGridList;
