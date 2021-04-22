import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const isDataEmptyObjectEmptyArrayOrFalsy = (data) => {
  if (!data) return true;
  else if (Array.isArray(data) && data.length === 0) return true;
  else if (typeof data === 'object' && Object.entries(data).length === 0) return true;
  
  return false;
};

const ErrorLoadingBox = ({ data, loading, error, children }) => {
  if (!isDataEmptyObjectEmptyArrayOrFalsy(data) && !loading && !error) return children;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="500px"
    >
      {loading && <CircularProgress size={30} color="primary" />}
      {!loading && error && <Alert severity="error" variant="filled">{error}</Alert>}
      {!loading && !error && isDataEmptyObjectEmptyArrayOrFalsy(data) && 'No information available'}
    </Box>
  );
};

ErrorLoadingBox.propTypes = {
  data: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ErrorLoadingBox;
