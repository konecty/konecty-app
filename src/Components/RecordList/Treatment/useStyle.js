import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		flexBasis: '45%',
		fontSize: theme.typography.pxToRem(13),

		'& + p': {
			fontSize: theme.typography.pxToRem(13),
		},
	},
	details: {
		p: {
			fontSize: theme.typography.pxToRem(14),
		},
	},
}));

export default styles;
