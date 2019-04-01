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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ImageAvatar from '../misc/ImageAvatar';

const styles = (theme) => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 2,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	},
	input: {
		margin: theme.spacing.unit
  },
  yourCustom: {
    color: 'yellow'
  }
});

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#6E8C13'
		},
		secondary: {
			main: '#8ba342'
		}
	},
	typography: { useNextVariants: true }
});

const RegisterForm = ({
	classes,
	email,
	name,
	password,
	role,
	errors,
	touch,
	handleChange,
	handleBlur,
	handleSubmit,
	isValid
}) => {
	return (
		<main className={classes.main}>
			<CssBaseline />
			<Paper className={classes.paper}>
				<ImageAvatar image="./hive-logo.png"/>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<MuiThemeProvider theme={theme}>
						<FormControl className={classes.formControl} margin="normal" fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input
								id="email"
								name="email"
								autoComplete="email"
								onChange={handleChange}
								value={email}
								onBlur={handleBlur}
							/>
							<FormHelperText id="component-error-text" error>
								{touch.email && errors.email}
							</FormHelperText>
						</FormControl>
						<FormControl className={classes.formControl} margin="normal" fullWidth>
							<InputLabel htmlFor="name">Name</InputLabel>
							<Input
								id="name"
								name="name"
								autoComplete="name"
								onChange={handleChange}
								value={name}
								onBlur={handleBlur}
							/>
							<FormHelperText id="component-error-text" error>
								{touch.email && errors.name}
							</FormHelperText>
						</FormControl>
						<FormControl className={classes.formControl} margin="normal" fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								name="password"
								type="password"
								id="password"
								onChange={handleChange}
								value={password}
								onBlur={handleBlur}
							/>
							<FormHelperText id="component-error-text" error>
								{touch.email && errors.password}
							</FormHelperText>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="age-simple">Role</InputLabel>
							<Select
								value={role}
								onChange={handleChange}
								inputProps={{
									name: 'role',
									id: 'role'
								}}
							>
								<MenuItem value={'USER'}>
									<em>User</em>
								</MenuItem>
								<MenuItem value={'PRODUCER'}>Producer</MenuItem>
							</Select>
						</FormControl>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={!isValid}
						>
							Register
						</Button>
					</MuiThemeProvider>
				</form>
			</Paper>
		</main>
	);
};

RegisterForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisterForm);
