import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	title: {
		marginBottom: theme.spacing(2),
	},

	textFieldRoot: {
		width: '100%',
	},
	inputControl: {
		paddingLeft: 128,
		// textAlign: 'right',
	},
	input: {
		// textAlign: 'right',
	},
	label: {
		width: 126,
		fontSize: '0.875rem',
		transform: 'translate(0, 24px) scale(1)',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
	},
}));

export default useStyles;
