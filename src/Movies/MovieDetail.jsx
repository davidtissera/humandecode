import PropTypes from 'prop-types';
import { Grid, makeStyles, Typography, useTheme, Button, Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useBreakpoint } from '../shared/tools';
import MoviePoster from './MoviePoster';

const useStyles = (props) =>
  makeStyles((theme) => ({
    cardDetail: {
      height: '100%',
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
        marginTop: theme.spacing(2),
      },
      background: 'none',
      borderColor: 'rgb(70, 70, 70)',
    }
  }));

const MovieDetail = ({ movie, handleClickGoBackToMovies }) => {
  const classes = useStyles()();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const theme = useTheme();
  const { breakpoint } = useBreakpoint();

  const responsive = {
    lg: '600px',
    md: '400px',
    sm: '220px',
    xs: '100%',
  };
  if (!movie) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          color="default"
          style={{ textTransform: 'none' }}
          onClick={handleClickGoBackToMovies}
          startIcon={<ArrowBackIcon />}
        >
          Go back
        </Button>
      </Grid>
      <Grid item container xs={12} justify="space-between">
        <Box width={responsive[breakpoint]}>
          <MoviePoster movie={movie} />
        </Box>
        <Box
          width={
            breakpoint === 'xs'
              ? '100%'
              : `calc(100% - (${responsive[breakpoint]} + 10px))`
          }
        >
          <Card
            raised
            elevation={2}
            variant="outlined"
            square
            className={classes.cardDetail}
          >
            <Box padding={theme.spacing(0.3)} width="inherit" height="inherit">
              <Typography
                variant="h5"
                style={{ color: theme.palette.primary.light }}
              >
                {movie.title}
              </Typography>
              <Divider
                light
                style={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                  backgroundColor: 'rgb(70, 70, 70)',
                }}
              />
              <Box mb={2} mt={1}>
                <Typography variant="caption" color="textSecondary">
                  Released on{' '}
                  <b>
                    {new Date(movie.release_date).toLocaleDateString(
                      'en-US',
                      options
                    )}
                  </b>
                </Typography>
              </Box>
              <Typography variant="subtitle2" gutterBottom>
                <b>Overview</b>
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {movie.overview}
              </Typography>
            </Box>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

MovieDetail.propTypes = {
  movie: PropTypes.object,
  handleClickGoBackToMovies: PropTypes.func,
};

export default MovieDetail;
