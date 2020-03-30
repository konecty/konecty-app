import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const Theme = createMuiTheme({
	palette: {
		statusRed: {
			color: '#e06a6a',
			contrastText: '#000',
		},
		statusYellow: {
			color: '#ffe000',
			contrastText: '#000',
		},
		statusGreen: {
			color: '#00ff72',
			contrastText: '#000',
		},
	},
});

export default responsiveFontSizes(Theme);
