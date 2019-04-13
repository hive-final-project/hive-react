import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  fabProgress: {
    color: '#F9B233',
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  }
});

class ButtonSuccess extends React.Component {
  state = {
    loading: false,
    success: false
  };


  componentDidUpdate(prevProps, prevState) {
    if(prevProps.orderStatus !== this.props.orderStatus && this.props.orderStatus === 'Delivered') {
      this.setState({ success: true })
    }
  }



  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {

    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {
          this.timer = setTimeout(() => {
            this.props.onClick()
            this.setState({
              loading: false,
              success: true,
            });
          }, 2000);
        },
      );
    }
  };

  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Fab color="primary" className={buttonClassname} onClick={this.handleButtonClick}>
            {success ? <CheckIcon /> : <FavoriteIcon />}
          </Fab>
          {loading && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
       
      </div>
    );
  }
}

ButtonSuccess.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSuccess);
