import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	root: {
		width: '100%',
		margin: theme.spacing(2, 0),
	},
	heading: {
		flexBasis: '45%',
		fontSize: theme.typography.pxToRem(13),

		'& + p': {
			fontSize: theme.typography.pxToRem(13),
		},
	},
	details: {
		'& p': {
			fontSize: theme.typography.pxToRem(14),
		},
		'&>.MuiBox-root': {
			margin: 0,
		},
	},
	accordionSummary: {
		padding: theme.spacing(0, 2),
	},
	summaryContent: {
		margin: theme.spacing(1, 0),
	},
}));

export default styles;
