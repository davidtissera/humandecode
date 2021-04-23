import { useEffect, useState } from 'react';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  starIconSelected: {
    color: 'gold',
  },
  starIconDisabled: {
    color: '#eee',
  },
}));

const RatingStars = ({ rating, setRating }) => {
  const classes = useStyles();
  const amountOfStarsToRender = 5;
  const [starsState, setStarsState] = useState([]);
  const [activeStar, setActiveStar] = useState(rating / 2);
  const arrayFromAmountOfStars = Array.from({ length: amountOfStarsToRender }, (v, k) => k);

  useEffect(() => {
    const arrayFromRating = Array.from({ length: Math.floor(activeStar) }, (v, k) => k);
    const stars = arrayFromAmountOfStars.map((rating, idx) => {
      if (arrayFromRating[idx] !== undefined) {
        return {
          star: idx + 1,
          selected: true
        };
      } else {
        return {
          star: idx + 1,
          selected: false
        };
      }
    });
    setStarsState(stars);
  }, [rating]);


  const handleClickStartIcon = (e, star) => {
    if (setRating) {
      if (star === activeStar) {
        setRating(0);
        setActiveStar(0);
      }
      else {
        setRating(star * 2);
        setActiveStar(star);
      }
    }
  };

  if (starsState.length === 0) return null;

  return (
    starsState.map((star, idx) => {
      return (
        <StarIcon
          key={JSON.stringify(star)}
          className={classes.starIcon}
          classes={{
            colorDisabled: classes.starIconDisabled,
            colorAction: classes.starIconSelected,
          }}
          color={star.selected ? 'action' : 'disabled'}
          onClick={(e) => handleClickStartIcon(e, star.star)}
        />
      );
    })
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func,
};

export default RatingStars;
