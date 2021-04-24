import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography, useTheme, Button, Divider, Breadcrumbs } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useBreakpoint } from '../shared/tools';
import MoviePoster from './MoviePoster';
import { getData, useSetApiDataToState } from '../shared/backend';
import { useGenreToState } from './moviesHelper';

const useStyles = (props) =>
  makeStyles((theme) => ({
    cardDetail: {
      height: '100%',
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
        marginTop: theme.spacing(2),
      },
      background: 'linear-gradient(0deg, rgba(22,22,22,1) 0%, rgba(36,36,36,1) 100%)',
      borderColor: 'rgb(70, 70, 70)',
    }
  }));

const GenresBreadCrumbs = ({ genres }) => {
  if (!genres || genres.length === 0) return null;
  return (
    <Breadcrumbs separator="·" aria-label="breadcrumb">
      {genres.map((genre) => (
        <Typography variant="caption" key={genre.id}>{genre.name}</Typography>
      ))}
    </Breadcrumbs>
  );
};

const MovieDetail = ({ movie, handleClickGoBackToMovies }) => {
  const [genres] = useGenreToState({ movie });
  const classes = useStyles()();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const theme = useTheme();
  const { breakpoint } = useBreakpoint();

  const responsive = {
    lg: '600px',
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
          startIcon={<ArrowBackIcon />}
        >
          Go back
        </Button>
      </Grid>
      <Grid item container xs={12} justify="space-between">
        <Box width={responsive[breakpoint]}>
          <MoviePoster movie={movie} />
        </Box>
        <Box
          width={
            breakpoint === 'xs'
              ? '100%'
              : `calc(100% - (${responsive[breakpoint]} + 10px))`
          }
        >
          <Card
            raised
            elevation={2}
            variant="outlined"
            square
            className={classes.cardDetail}
          >
            <Box padding={theme.spacing(0.3)} width="inherit" height="inherit">
              <Typography
                variant="h5"
                style={{ color: theme.palette.primary.light }}
              >
                {movie.title}
              </Typography>
              <Divider
                light
                style={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                  backgroundColor: 'rgb(70, 70, 70)',
                }}
              />
              <GenresBreadCrumbs genres={genres} />
              <Box mb={2} mt={1}>
                <Typography variant="caption" color="textSecondary">
                  Released on{' '}
                  <b>
                    {new Date(movie.release_date).toLocaleDateString(
                      'en-US',
                      options
                    )}
                  </b>
                </Typography>
              </Box>
              <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 800 }}>
                Overview
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {movie.overview}
              </Typography>
            </Box>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

MovieDetail.propTypes = {
  movie: PropTypes.object,
  handleClickGoBackToMovies: PropTypes.func,
};

GenresBreadCrumbs.propTypes = {
  genres: PropTypes.array,
};

export default MovieDetail;
