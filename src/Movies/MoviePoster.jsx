import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import RatingStars from '../shared/Components/RatingStars';
import { imageBaseUrl } from '../shared/backend';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = (props) =>
  makeStyles((theme) => ({
    img: {
      position: 'relative',
      bottom: 0,
    },
  }));

const BottomShadowBox = styled(Box)({
  background: 'linear-gradient(180deg, rgba(74,74,74,0.0) 50%, rgba(20,20,20,0.3) 100%)',
  '&:hover': {
    background: 'linear-gradient(180deg, rgba(74,74,74,0.0) 50%, rgba(20,20,20,0.5) 90%)',
  },
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
});

export const MovieCard = styled(Card)({
  position: 'relative',
  height: '100%',
  zIndex: 1000,
});

const MoviePoster = ({ movie, clickable, CardProps, ...props }) => {
  const classes = useStyles({ imageSrc: movie.poster_path, clickable })();

  return (
    <MovieCard
      raised
      elevation={4}
      style={{ cursor: clickable ? 'pointer' : 'default' }}
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
      <Box position="absolute" bottom={10} right={10} zIndex={1001}>
        <RatingStars rating={movie.vote_average} />
      </Box>
      <BottomShadowBox />
    </MovieCard>
  );
};

MoviePoster.propTypes = {
  movie: PropTypes.object,
  CardProps: PropTypes.object,
  clickable: PropTypes.bool,
};

export default MoviePoster;
