import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const NoDataBox = () => {
  return (
    <Box width="100%" height="500px" display="flex" alignItems="center" justifyContent="center">
      <Typography variant="body1" color="initial">No information available</Typography>
    </Box>
  )
};

export default NoDataBox;
