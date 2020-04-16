import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	title: {
		marginBottom: theme.spacing(2),
	},

	textFieldRoot: {
		width: '100%',
	},
	inputControl: {
		paddingLeft: 100,
		textAlign: 'right',
	},
	input: {
		textAlign: 'right',
	},
	label: {
		fontSize: '0.875rem',
		transform: 'translate(0, 24px) scale(1)',
	},
}));

export default useStyles;
