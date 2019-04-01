import '../../styles/ui.css';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Fragment from '@material-ui/core/FormHelperText';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ImageAvatar from '../misc/ImageAvatar';
import NavBar from '../misc/NavBar';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#6E8C13'
		},
		secondary: {
			main: '#8ba342'
		},
		tertiary: {
			main: '#F9B233'
		}
	},
	typography: { useNextVariants: true }
});

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
		marginTop: theme.spacing.unit * 8,
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
	}
});


const ProfileForm = ({
	classes,
	email,
	name,
	password,
    imageURL,
    attachment,
	errors,
	touch,
	deliverDay,
	category,
	handleChange,
	handleBlur,
    handleSubmit,
    isValid,
	isProducer
}) => {
	return(
		<Fragment>
			<NavBar />
            <main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<ImageAvatar image={imageURL} />
					<Typography component="h1" variant="h5">
						Edit your profile:
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
							{isProducer && (
								<FormControl className={classes.formControl} fullWidth>
									<InputLabel htmlFor="deliverDay">Deliver day:</InputLabel>
									<Select
										value={deliverDay}
										onChange={handleChange}
										inputProps={{
											name: 'deliverDay',
											id: 'deliverDay'
										}}
									>
										<MenuItem value={'Monday'}>
											<em>Monday</em>
										</MenuItem>
										<MenuItem value={'Tuesday'}>Tuesday</MenuItem>
										<MenuItem value={'Wednesday'}>Wednesday</MenuItem>
										<MenuItem value={'Thursday'}>Thursday</MenuItem>
										<MenuItem value={'Friday'}>Friday</MenuItem>
									</Select>
								</FormControl>
							)}
							{isProducer && (
								<FormControl className={classes.formControl} margin="normal" fullWidth>
									<InputLabel htmlFor="category">Category</InputLabel>
									<Input
										id="category"
										name="category"
										onChange={handleChange}
										value={category}
										onBlur={handleBlur}
									/>
								</FormControl>
                            )}
                            <FormControl className={classes.formControl} margin="normal" fullWidth>
								<InputLabel htmlFor="attachment">Change your profile image:</InputLabel>
								<Input
									id="attachment"
                                    name="attachment"
									type="file"
									onChange={handleChange}
									value={attachment}
									onBlur={handleBlur}
								/>
								<FormHelperText id="component-error-text" error>
									{touch.email && errors.name}
								</FormHelperText>
							</FormControl>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disabled={!isValid}
							>
								Edit Profile
							</Button>
						</MuiThemeProvider>
					</form>
				</Paper>
			</main>
		</Fragment>
	);
};

ProfileForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileForm);