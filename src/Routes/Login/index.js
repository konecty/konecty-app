import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';

import Copyright from '../../Components/Copyright';
import Link from '../../Components/Link';
import useStyles from './useStyles';

import logo from '../../assets/konecty.png';

const Login = () => {
	const classes = useStyles();
	const { t } = useTranslation();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<img src={logo} alt="Konecty Open source business platform" />
				<Typography component="h1" variant="h5">
					{t('login-title')}
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label={t('user')}
						name="user"
						autoComplete="user"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label={t('password')}
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						{t('sign-in')}
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to="/" variant="body2">
								{t('forgot-password')}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Login;
