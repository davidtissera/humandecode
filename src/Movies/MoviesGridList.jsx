import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import RatingStars from '../shared/Components/RatingStars';

const MoviesGridList = ({ movies }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) =>
        movie.poster_path ? (
          <Grid
            key={JSON.stringify(movie)}
            item
            container
            xs={12}
            sm={6}
            md={4}
            lg={3}
            justify="center"
            alignItems="center"
          >
            <Box
              position="relative"
              width="100%"
              height="100%"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width="100%"
                height="100%"
              />
              <Box position="absolute" bottom={10} right={10}>
                <RatingStars rating={movie.vote_average} />
              </Box>
            </Box>
          </Grid>
        ) : null
      )}
    </Grid>
  );
};

MoviesGridList.propTypes = {
  movie: PropTypes.object,
};

export default MoviesGridList;
