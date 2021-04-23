import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Slide, Grow, Typography, useTheme, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import RatingStars from '../shared/Components/RatingStars';
import { imagePath } from '../shared/backend';
import { useBreakpoint } from '../shared/tools';

const useStyles = props => makeStyles((theme) => ({
  posterBox: {
  },
  ratingStars: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  card: {
    position: 'relative',
    width: '100%',
    height: '350px',
    backgroundSize: 'cover',
    cursor: 'pointer',
    backgroundImage: `url(${imagePath}${props.imageSrc})`,
    '&:hover': {
      backgroundImage: `linear-gradient(180deg, rgba(234,234,234,0) 70%, rgba(0,0,0,0.2) 90%), url(${imagePath}${props.imageSrc})`,
    },
  },
}));

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
      <Slide in={showMovies} timeout={500}>
        <Grid container spacing={2}>
          {movies.map((movie) =>
            movie.poster_path && showMovies ? (
              <Grid
                item
                container
                xs={6}
                sm={4}
                md={3}
                justify="center"
                alignItems="center"
              >
                <MoviePoster movie={movie} onClick={() => handleClickMovie(movie)} />
              </Grid>
            ) : null
          )}
        </Grid>
      </Slide>
      <Slide in={showMovieDetail} timeout={700} direction="left">
        <Grid container>
          <Grid item xs={12}>
            <MovieDetail movie={movie} handleClickGoBackToMovies={handleClickGoBackToMovies} />
          </Grid>
        </Grid>
      </Slide>
    </>
  );
};

const MoviePoster = ({ movie, ...props }) => {
  const classes = useStyles({ imageSrc: movie.poster_path })();

  return (
    <Card
      classes={{ root: classes.card }}
      raised
      elevation={4}
      {...props}
    >
      <Box classes={{ root: classes.ratingStars }}>
        <RatingStars rating={movie.vote_average} />
      </Box>
    </Card>
  );
};

const MovieDetail = ({ movie, handleClickGoBackToMovies }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const theme = useTheme();
  const { value: breakpoint } = useBreakpoint();
  console.log(movie);
  if (!movie) return null;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          style={{ textTransform: 'none' }}
          onClick={handleClickGoBackToMovies}
        >
          ← Go back to movies list
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <MoviePoster
          movie={movie}
          style={{ height: breakpoint < 2 ? '100vw' : '50vw' }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          style={{ height: breakpoint < 2 ? '100%' : '50vw' }}
          raised
          elevation={2}
        >
          <Box padding={theme.spacing(0.3)} width="inherit" height="inherit">
            <Typography variant="h5">{movie.title}</Typography>
            <Box mb={2} mt={1}>
              <Typography variant="caption">
                Released on{' '}
                <b>
                  {new Date(movie.release_date).toLocaleDateString(
                    'en-US',
                    options
                  )}
                </b>
              </Typography>
            </Box>
            <Typography variant="subtitle1">
              <b>Overview</b>
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {movie.overview}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

MoviesGridList.propTypes = {
  movies: PropTypes.array,
};

MoviePoster.propTypes = {
  movie: PropTypes.object,
};

MovieDetail.propTypes = {
  movie: PropTypes.object,
  handleClickGoBackToMovies: PropTypes.func,
};

export default MoviesGridList;
