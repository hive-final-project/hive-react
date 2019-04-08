import '../../styles/ui.css';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ImageAvatar from '../misc/ImageAvatar';

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
		marginTop: theme.spacing.unit ,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
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


const EditProductForm = ({
	classes,
	name,
    price,
    amount,
    imageURL,
    category,
	description,
	active,
	handleChange,
	handleSubmit,
	handleFile,
}) => {
	return(
            <main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
                    <ImageAvatar image={imageURL} className={classes.bigAvatar} />
					<Typography component="h1" variant="h5">
						Edit product:
					</Typography>
					<form className={classes.form} onSubmit={handleSubmit}>
						<MuiThemeProvider theme={theme}>
							<FormControl className={classes.formControl} margin="normal" fullWidth>
								<InputLabel htmlFor="name">Name</InputLabel>
								<Input
									id="name"
									name="name"
									autoComplete="name"
									onChange={handleChange}
									value={name}
								/>
							</FormControl>
						    <FormControl className={classes.formControl} margin="normal" fullWidth>
								<InputLabel htmlFor="category">Category</InputLabel>
                                <Select
										value={category}
										onChange={handleChange}
										inputProps={{
											name: 'category',
											id: 'category'
										}}
									>
										<MenuItem value={"veggie"}>
											<em>Fruits and Vegetables</em>
										</MenuItem>
										<MenuItem value={"milky"}>Milk products</MenuItem>
										<MenuItem value={"poultry"}>Poultry products</MenuItem>
										<MenuItem value={"apiculture"}>Apiculture</MenuItem>
										<MenuItem value={"butcher"}>Butcher products</MenuItem>
									</Select>
							</FormControl>
                            <FormControl className={classes.formControl} margin="normal" fullWidth>
								<InputLabel htmlFor="price">Price</InputLabel>
								<Input
									id="price"
									name="price"
									autoComplete="price"
									onChange={handleChange}
									value={price}
								/>
							</FormControl>
                            <FormControl className={classes.formControl} margin="normal" fullWidth>
								<InputLabel htmlFor="amount">Amount</InputLabel>
								<Input
									id="amount"
									name="amount"
									autoComplete="amount"
									onChange={handleChange}
									value={amount}
								/>
							</FormControl>
                            <FormControl className={classes.formControl} margin="normal" fullWidth>
								<InputLabel htmlFor="description">Description</InputLabel>
								<Input
									id="description"
									name="description"
									autoComplete="description"
									onChange={handleChange}
									value={description}
								/>
							</FormControl>
                            <FormControl className={classes.formControl} margin="normal" fullWidth>
								<InputLabel htmlFor="attachment">Product image:</InputLabel>
								<Input
									id="attachment"
                                    name="attachment"
									type="file"
									onChange={handleFile}
								/>
							</FormControl>
							<FormControlLabel
								className={classes.formControl}
								margin="normal"
								fullWidth
          						control={
            					<Checkbox
              						checked={active}
              						onChange={handleChange}
              						value="active"
              						color="primary"
           						/>
          						}
          						label="Active"
       						/>
							<FormControl className={classes.formControl} margin="normal" fullWidth>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="button-new-product"
							>
								New Product
							</Button>
							</FormControl>
						</MuiThemeProvider>
					</form>
				</Paper>
			</main>
	);
};

EditProductForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProductForm);