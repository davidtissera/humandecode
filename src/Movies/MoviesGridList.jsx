import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Slide, Typography, useTheme, Button, Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RatingStars from '../shared/Components/RatingStars';
import { imageBaseUrl } from '../shared/backend';
import { useBreakpoint } from '../shared/tools';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = (props) =>
  makeStyles((theme) => ({
    ratingStars: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    card: {
      position: 'relative',
      height: '100%',
      cursor: 'pointer',
    },
    img: {
      position: 'relative',
      bottom: 0,
    }
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
                />
              </Grid>
            ) : null
          )}
        </Grid>
      </Slide>
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
    </>
  );
};

const MoviePoster = ({ movie, CardProps, ...props }) => {
  const classes = useStyles({ imageSrc: movie.poster_path })();

  return (
    <Card
      classes={{ root: classes.card, paper: classes.paper }}
      raised
      elevation={4}
      {...CardProps}
    >
      <LazyLoadImage
        alt={movie.title}
        className={classes.img}
        src={`${imageBaseUrl}${movie.poster_path}`}
        width="100%"
        height="100%"
        {...props}
      />
      <Box position="absolute" bottom={10} right={10}>
        <RatingStars rating={movie.vote_average} />
      </Box>
    </Card>
  );
};

const MovieDetail = ({ movie, handleClickGoBackToMovies }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const theme = useTheme();
  const { breakpoint } = useBreakpoint();

  const responsive = {
    lg: '500px',
    md: '400px',
    sm: '220px',
    xs: '100%',
  };
  if (!movie) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          color="default"
          style={{ textTransform: 'none' }}
          onClick={handleClickGoBackToMovies}
          startIcon={(
            <ArrowBackIcon />
          )}
        >
          Go back
        </Button>
      </Grid>
      <Grid item container xs={12} justify="space-between">
        <Box width={responsive[breakpoint]}>
          <MoviePoster
            movie={movie}
          />
        </Box>
        <Box width={breakpoint === 'xs' ? '100%' : `calc(100% - (${responsive[breakpoint]} + 10px))`}>
          <Card
            raised
            elevation={2}
            variant="outlined"
            square
            style={{ height: '100%', marginTop: breakpoint === 'xs' && theme.spacing(2) }}
          >
            <Box padding={theme.spacing(0.3)} width="inherit" height="inherit">
              <Typography variant="h5" style={{ fontWeight: '800' }}>{movie.title}</Typography>
              <Divider light style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }} />
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
        </Box>
      </Grid>
    </Grid>
  );
};

MoviesGridList.propTypes = {
  movies: PropTypes.array,
};

MoviePoster.propTypes = {
  movie: PropTypes.object,
  CardProps: PropTypes.object,
};

MovieDetail.propTypes = {
  movie: PropTypes.object,
  handleClickGoBackToMovies: PropTypes.func,
};

export default MoviesGridList;
