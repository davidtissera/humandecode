import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import RatingStars from '../shared/Components/RatingStars';
import { imagePath } from '../shared/backend';

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
  return (
    <Grid container spacing={2}>
      {movies.map((movie) =>
        movie.poster_path ? (
          <Grid
            key={JSON.stringify(movie)}
            item
            container
            xs={6}
            sm={4}
            md={3}
            justify="center"
            alignItems="center"
          >
            <MoviePoster movie={movie} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
};

const MoviePoster = ({ movie }) => {
  const classes = useStyles({ imageSrc: movie.poster_path })();

  return (
    <Card
      classes={{ root: classes.card }}
      raised
      elevation={4}
    >
      <Box classes={{ root: classes.ratingStars }}>
        <RatingStars rating={movie.vote_average} />
      </Box>
    </Card>
  );
};

MoviesGridList.propTypes = {
  movies: PropTypes.array,
};

MoviePoster.propTypes = {
  movie: PropTypes.object,
};

export default MoviesGridList;
