import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
};

const ImageAvatar = ({classes, image}) => {

  return (
    <Grid component={'span'} container justify="center" alignItems="center">
      <Avatar component={'span'} alt="Remy Sharp" src={image} />
    </Grid>
  );
}

ImageAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatar);