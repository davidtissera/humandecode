import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import SadFaceIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Alert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';

const isDataEmptyObjectEmptyArrayOrFalsy = (data) => {
  if (!data) return true;
  else if (Array.isArray(data) && data.length === 0) return true;
  else if (typeof data === 'object' && Object.entries(data).length === 0) return true;
  
  return false;
};

const ErrorSadFace = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%" flexDirection="column">
      <SadFaceIcon fontSize="large" />
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        No information available
      </Typography>
    </Box>
  );
};

const ErrorLoadingBox = ({ data, loading, error, children }) => {
  if (!isDataEmptyObjectEmptyArrayOrFalsy(data) && !loading && !error) return children;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="50vh"
    >
      {loading && <CircularProgress size={50} color="primary" />}
      {!loading && error && <Alert severity="error" variant="filled">{error}</Alert>}
      {!loading && !error && isDataEmptyObjectEmptyArrayOrFalsy(data) && <ErrorSadFace />}
    </Box>
  );
};

ErrorLoadingBox.propTypes = {
  data: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ErrorLoadingBox;
