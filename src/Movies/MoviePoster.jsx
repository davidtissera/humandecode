import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import RatingStars from '../shared/Components/RatingStars';
import { imageBaseUrl } from '../shared/backend';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = (props) =>
  makeStyles((theme) => ({
    card: {
      position: 'relative',
      height: '100%',
      cursor: 'pointer',
    },
    img: {
      position: 'relative',
      bottom: 0,
    },
  }));

const MoviePoster = ({ movie, CardProps, ...props }) => {
  const classes = useStyles({ imageSrc: movie.poster_path })();

  return (
    <Card
      classes={{ root: classes.card }}
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

MoviePoster.propTypes = {
  movie: PropTypes.object,
  CardProps: PropTypes.object,
};

export default MoviePoster;
