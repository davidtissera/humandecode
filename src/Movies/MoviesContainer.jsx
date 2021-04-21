import Table from '../shared/Components/Table';
import { getData, useSetApiDataToState } from '../shared/backend';

const orderMoviesByPopularity = (movies) => {
  if (!movies) return [];
  return [...movies].sort((a, b) => {
    if (a.popularity < b.popularity) return 1;
    else if (a.popularity > b.popularity) return -1;
    else return 0;
  });
};

const Movies = () => {
  const [moviesSearch] = useSetApiDataToState({
    promise: getData({ url: '/search/movie', queryParams: { query: 'Tarantino' } }),
  });

  const moviesSorted = orderMoviesByPopularity(moviesSearch.data.results);

  if (moviesSearch.loading) return 'Loading...';
  if (moviesSearch.error) return <div style={{ color: 'red' }}>{moviesSearch.error}</div>

  const columns = [
    { Header: 'Title', accessor: 'title' },
    { Header: 'Popularity', accessor: 'popularity' },
    { Header: 'Release date', accessor: 'release_date' },
    {
      Header: '',
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
  ];

  return <Table rows={moviesSorted} columns={columns} />;
};

export default Movies;
