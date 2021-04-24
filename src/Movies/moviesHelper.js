import { useEffect, useState } from 'react';
import { getData, useSetApiDataToState } from '../shared/backend';

export const useGenreToState = ({ movie }) => {
  const [genres, setGenres] = useState([]);
  const [genresState] = useSetApiDataToState({
    promise: getData({ url: '/genre/movie/list' }),
    deps: [],
  });

  useEffect(() => {
    const movGenres = genresState?.data?.genres?.filter((genre) => {
      if (movie.genre_ids.length > 0) {
        return movie.genre_ids.includes(genre.id);
      }
    });
    setGenres(movGenres);
  }, [genresState]);

  return [genres, setGenres];
};