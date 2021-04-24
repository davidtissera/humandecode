import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import SadFaceIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Alert from '@material-ui/lab/Alert';
import { styled, Typography } from '@material-ui/core';
import { isEmpty, predicateEmpty } from '../tools';

const ErrorSadFace = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%" flexDirection="column">
      <SadFaceIcon fontSize="large" />
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        No movies available
      </Typography>
    </Box>
  );
};

const ContentBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '50vh',
});

const ErrorLoadingBox = ({
  data = [],
  loading,
  error,
  children,
  loadingSchema = <CircularProgress size={40} color="primary" />,
}) => {
  const conditionError = error && !loading;
  const conditionDataLoaded = !isEmpty(data, predicateEmpty) && !loading;
  const conditionLoading = loading;
  const conditionNoInformation = isEmpty(data, predicateEmpty) && !loading && !error;

  return (
    <>
      {conditionLoading && <ContentBox>{loadingSchema}</ContentBox>}
      {conditionDataLoaded && <Box minHeight="51vh" width="100%">{children}</Box>}
      {conditionError && <ContentBox><Alert severity="error" variant="filled">{error}</Alert></ContentBox>}
      {conditionNoInformation && <ContentBox><ErrorSadFace /></ContentBox>}
    </>
  );
};

ErrorLoadingBox.propTypes = {
  data: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.string,
  loadingSchema: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default ErrorLoadingBox;
