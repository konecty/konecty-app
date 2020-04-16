import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const Theme = createMuiTheme({
	palette: {
		statusRed: {
			main: '#B70007',
			contrastText: '#fff',
		},
		statusYellow: {
			main: '#EBB831',
			contrastText: '#fff',
		},
		statusGreen: {
			main: '#33CC33',
			contrastText: '#fff',
		},
	},
});

export default responsiveFontSizes(Theme);
