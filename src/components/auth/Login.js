import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { Link, Redirect } from 'react-router-dom';
import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../context/AuthStore';
import LogoAvatar from '../misc/LogoAvatar';


const emailRegEx = /(.+)@(.+){2,}\.(.+){2,}/i;
const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}/;

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
	},
	formControl: {
    margin: theme.spacing.unit,
	},
	input: {
    margin: theme.spacing.unit,
  }
});

const validations = {
  email: (value) => {
    let message;
    if (!value) {
      message = 'Email is required';
    } else if (!emailRegEx.test(value)) {
      message = 'Invalid email pattern';
    }
    return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = 'Password is required';
    } else if (!passRegEx.test(value)) {
      message = 'You should use uppercase, lowercase, numbers and special characters.'
    return message;
  	}
	}
}	

class Login extends Component {

	state = {
    user: {
      email: '',
      password: ''
    },
    errors: {
      email: validations.email(),
      password: validations.password(),
    },
    touch: {},
    isAuthenticated: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      authService.authenticate(this.state.user)
        .then(
          (user) => this.setState({ isAuthenticated: true },()=>{
            this.props.onUserChanged(user)
          }),
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...errors,
                password: !errors && message
              },
              touch: {
                ...errors,
                password: !errors && message
              }
            })
          }
        )
    }
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  render () {
		const { isAuthenticated, errors, user, touch } = this.state;
		const { classes } = this.props;
		
		if (isAuthenticated) {
      return (<Redirect to="/" />)
    }

    return (
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <LogoAvatar/>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl className={classes.formControl} margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" onChange={this.handleChange} value={user.email} onBlur={this.handleBlur} autoFocus />
						<FormHelperText id="component-error-text" error>{errors.email}</FormHelperText>
					</FormControl>
            <FormControl className={classes.formControl} margin="normal" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" onChange={this.handleChange} value={user.password} onBlur={this.handleBlur}/>
						<FormHelperText id="component-error-text" error>{errors.password}</FormHelperText>
					</FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
						className={classes.submit}
						disabled={!this.isValid()}
          >
            Log in
          </Button>
        </form>
      </Paper>
    </main>
  )}
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(withAuthConsumer(Login));