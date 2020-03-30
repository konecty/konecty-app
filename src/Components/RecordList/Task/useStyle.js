import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		flexBasis: '33%',
		fontSize: theme.typography.pxToRem(13),

		'& + p': {
			fontSize: theme.typography.pxToRem(13),
		},
	},
	subHeader: {
		fontSize: theme.typography.pxToRem(13),
	},
	content: {
		p: {
			fontSize: theme.typography.pxToRem(14),
		},
		svg: {
			verticalAlign: 'middle',
		},
	},
}));

export default styles;
