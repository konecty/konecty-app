import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	box: {
		background: theme.palette.primary.main,
		color: 'white',
		padding: theme.spacing(2),
	},
	title: {
		// marginBottom: theme.spacing(2),
	},
	chip: {
		marginRight: theme.spacing(1),
	},
	root: {
		// '& .MuiTextField-root': {
		// 	display: 'block',
		// 	margin: theme.spacing(2, 0),
		// 	width: 200,
		// },
	},
}));

export default useStyles;
