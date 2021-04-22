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
  const arrayFromAmountOfStars = Array.from({ length: amountOfStarsToRender }, (v, k) => k);

  useEffect(() => {
    const arrayFromRating = Array.from({ length: Math.floor(rating / 2) }, (v, k) => k);
    const stars = arrayFromAmountOfStars.map((rating, idx) => {
      if (arrayFromRating[idx] !== undefined) {
        return {
          star: idx,
          selected: true
        };
      } else {
        return {
          star: idx,
          selected: false
        };
      }
    });
    setStarsState(stars);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);


  const handleClickStartIcon = (e, star) => {
    if (setRating) {
      if (star === 0 && rating !== 0) setRating(0);
      else if (star === 0 && rating === 0) setRating((star + 1) * 2);
      else setRating((star + 1) * 2);
    }
  };

  if (starsState.length === 0) return null;

  return (
    starsState.map((star, idx) => {
      return (
        <StarIcon
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
  rating: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10]),
  setRating: PropTypes.func,
};

export default RatingStars;
