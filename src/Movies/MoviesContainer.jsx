import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core';
import { getData, useSetApiDataToState } from '../shared/backend';
import RatingStars from '../shared/Components/RatingStars';
import Typography from '@material-ui/core/Typography';
import ErrorLoadingBox from '../shared/Components/ErrorLoadingBox';
import MoviesGridList from './MoviesGridList';

const orderMoviesByPopularity = (movies) => {
  if (!movies) return [];
  return [...movies].sort((a, b) => {
    if (a.popularity < b.popularity) return 1;
    else if (a.popularity > b.popularity) return -1;
    else return 0;
  });
};

// TODO: Refactor
const ratingFilterPredicate = (rating, movie) => {
  if (rating > 0 && rating <= 2) {
    return movie.vote_average >= 0 && movie.vote_average <= 2;
  } else if (rating >= 2 && rating <= 4) {
    return movie.vote_average >= 2 && movie.vote_average <= 4;
  } else if (rating >= 4 && rating <= 6) {
    return movie.vote_average >= 4 && movie.vote_average <= 6;
  } else if (rating >= 6 && rating <= 8) {
    return movie.vote_average >= 6 && movie.vote_average <= 8;
  } else if (rating >= 8 && rating <= 10) {
    return movie.vote_average >= 8 && movie.vote_average <= 10;
  }
};

const Movies = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState({
    searchBarMovie: '',
    rating: 0,
  });
  const queryParams = {
    query: filter.searchBarMovie,
  };
  const [moviesSearch] = useSetApiDataToState({
    promise: getData({ url: '/search/movie', queryParams }),
    timeoutMsecs: 1000,
    deps: [filter],
  });

  const moviesSorted = orderMoviesByPopularity(moviesSearch.data.results);
  const predicate = (movie) => {
    return ratingFilterPredicate(filter.rating, movie, 9);
  };
  const moviesFilteredByRating =
    filter.rating > 0
      ? moviesSorted.filter((movie) => predicate(movie))
      : moviesSorted;

  const handleChangeSearchBar = (e) => {
    setFilter((prev) => ({ ...prev, searchBarMovie: e.target.value }));
  };

  return (
    <Container maxWidth="lg" style={{ padding: theme.spacing(4) }}>
      <Card elevation={0} style={{ padding: theme.spacing(2) }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h4">Amazing movie finder</Typography>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Search movie"
                placeholder="Search your favourite movie..."
                variant="outlined"
                fullWidth
                autoFocus
                value={filter.searchBarMovie}
                onChange={handleChangeSearchBar}
              />
            </Grid>
            <Grid item container xs={12} justify="flex-end" alignItems="center">
              <Typography
                variant="caption"
                style={{ marginRight: theme.spacing(2) }}
              >
                Filter movie by rating star
              </Typography>
              <RatingStars
                rating={Math.floor(filter.rating)}
                setRating={(rat) =>
                  setFilter((prev) => ({ ...prev, rating: Math.floor(+rat) }))
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ErrorLoadingBox
              loading={moviesSearch.loading}
              error={moviesSearch.error}
              data={moviesFilteredByRating}
            >
              <MoviesGridList movies={moviesFilteredByRating} />
            </ErrorLoadingBox>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Movies;
