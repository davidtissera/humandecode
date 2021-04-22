import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingBox = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="500px"
    >
      <CircularProgress size={30} color="primary" />
    </Box>
  );
};

export default LoadingBox;
