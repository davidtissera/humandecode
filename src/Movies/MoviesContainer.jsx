import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core';
import Table from '../shared/Components/Table';
import LoadingBox from '../shared/Components/LoadingBox';
import { getData, useSetApiDataToState } from '../shared/backend';
import RatingStars from '../shared/Components/RatingStars';
import Typography from '@material-ui/core/Typography'

const orderMoviesByPopularity = (movies) => {
  if (!movies) return [];
  return [...movies].sort((a, b) => {
    if (a.popularity < b.popularity) return 1;
    else if (a.popularity > b.popularity) return -1;
    else return 0;
  });
};

const Movies = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState({
    searchBarMovie: '',
    rating: 0,
  });
  const [moviesSearch] = useSetApiDataToState({
    promise: getData({ url: '/search/movie', queryParams: { query: filter.searchBarMovie } }),
    timeoutMsecs: 1000,
    deps: [filter],
  });

  const moviesSorted = orderMoviesByPopularity(moviesSearch.data.results);
  const predicate = (movie) => {
    if (filter.rating > 0 && filter.rating <= 2) {
      return movie.vote_average > 0 && movie.vote_average <= 2;
    } else if (filter.rating > 2 && filter.rating <= 4) {
      return movie.vote_average > 2 && movie.vote_average <= 4
    } else if (filter.rating > 4 && filter.rating <= 6) {
      return movie.vote_average > 4 && movie.vote_average <= 6
    } else if (filter.rating > 6 && filter.rating <= 8) {
      return movie.vote_average > 6 && movie.vote_average <= 8;
    } else if (filter.rating > 8 && filter.rating <= 10) {
      return movie.vote_average > 8 && movie.vote_average <= 10;
    }
  };
  const moviesFilteredByRating = filter.rating > 0 ? moviesSorted.filter((movie) => predicate(movie)) : moviesSorted;

  if (moviesSearch.error)
    return (
      <div style={{ width: '100%', height: '100px', backgroundColor: 'red' }}>
        {moviesSearch.error}
      </div>
    );

  const columns = [
    { Header: 'Title', accessor: 'title' },
    { Header: 'Popularity', accessor: 'popularity' },
    { Header: 'Release date', accessor: 'release_date' },
    {
      Header: 'Poster',
      accessor: 'poster_path',
      Cell: (row) => (
        row.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${row.poster_path}`}
            width="100px"
            height="100px"
            alt={`${row.title} poster`}
          />
        ) : null
      ),
    },
    {
      Header: 'Rating',
      accessor: 'vote_average',
      // Cell: (row) => (
      //   <RatingStars rating={Math.floor(+row.vote_average)} />
      // ),
    }
  ];

  const handleChangeSearchBar = (e) => {
    setFilter((prev) => ({ ...prev, searchBarMovie: e.target.value }));
  };

  return (
    <Container maxWidth="md" style={{ padding: theme.spacing(4) }}>
      <Card elevation={8} style={{ padding: theme.spacing(2) }}>
        <Grid container spacing={4}>
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
              color="initial"
              style={{ marginRight: theme.spacing(2) }}
            >
              Filter movie by rating star
            </Typography>
            <RatingStars rating={Math.floor(filter.rating)} setRating={(rat) => setFilter((prev) => ({ ...prev, rating: Math.floor(+rat) }))} />
          </Grid>
          <Grid item xs={12}>
            {moviesSearch.loading ? (
              <LoadingBox />
            ) : (
              <Table rows={moviesFilteredByRating} columns={columns} />
            )}
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Movies;
