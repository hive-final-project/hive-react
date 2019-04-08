import '../../styles/ui.css';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ImageAvatar from '../misc/ImageAvatar';
import { pics } from '../../utils/imgProvider';
import { Link } from 'react-router-dom';


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
      marginTop: theme.spacing.unit * 2,
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
      margin: theme.spacing.unit
    },
    link: {
      color: 'primary',
      marginTop: theme.spacing.unit * 2,
    }
  });
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#6E8C13'  
      },
      secondary: {
        main: '#8ba342'  
      },
    },
    typography: { useNextVariants: true }
  });
  
  const LoginForm = ({
    classes,
	  email,
	  password,
	  errors,
	  touch,
	  handleChange,
	  handleBlur,
    handleSubmit,
    isValid,
  }) => {
      return (

      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <br />
        <ImageAvatar image={pics.miniLogo} classes={classes.bigAvatar}/>
        <Typography component="h1" variant="h5">
        <br />
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <MuiThemeProvider theme={theme}>
          <FormControl className={classes.formControl} margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" onChange={handleChange} value={email} onBlur={handleBlur}/>
            <FormHelperText id="component-error-text" error>{touch.email && errors.email}</FormHelperText>
					</FormControl>
          <FormControl className={classes.formControl} margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" onChange={handleChange} value={password} onBlur={handleBlur}/>
						  <FormHelperText id="component-error-text" error>{touch.email && errors.password}</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} margin="normal" fullWidth>
            <Button
              type="submit"
              variant="contained"
              color="primary"
			        className={classes.submit}
			        disabled={!isValid}
            >
              Log in
            </Button>
            </FormControl>
            <Typography className={classes.link} component="h8" variant="h7">
              Don't have an account? <Link to="/register">Register now!</Link>
            </Typography>
          </MuiThemeProvider>
        </form>
      </Paper>
    </main>
      );
  }

  LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(LoginForm)