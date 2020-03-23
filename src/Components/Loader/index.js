import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
		background: '#ffffff11',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

const Loader = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
};

export default Loader;
