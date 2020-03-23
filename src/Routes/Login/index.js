import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authLogin } from './actions';

import Copyright from '../../Components/Copyright';
import Link from '../../Components/Link';
import useStyles from './useStyles';

import logo from '../../assets/konecty.png';

const Login = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [username, setLogin] = useState('');
	const [pass, setPass] = useState('');

	const { user } = useSelector(({ app }) => app);

	const onChange = func => ({ target }) => func(target.value);
	const submit = event => {
		event.preventDefault();
		dispatch(authLogin({ username, pass }));
	};

	if (user && user.logged) {
		return <Redirect to="/" />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<img src={logo} alt="Konecty Open source business platform" />
				<Typography component="h1" variant="h5">
					{t('login-title')}
				</Typography>
				<form className={classes.form} noValidate action="#" onSubmit={submit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label={t('user')}
						value={username}
						onChange={onChange(setLogin)}
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
						value={pass}
						onChange={onChange(setPass)}
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
