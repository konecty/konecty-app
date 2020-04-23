import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const ElegantError = ({ text, fullScreen }) => (
	<Box
		width={fullScreen ? '100vw' : 1}
		height={fullScreen ? '100vh' : 1}
		display="flex"
		alignItems="center"
		justifyContent="center"
	>
		<Box display="flex" flexDirection="column">
			<Typography variant="body1">Oops!</Typography>
			<Typography variant="body2">{text}</Typography>
		</Box>
	</Box>
);

if (process.env.__DEV__) {
	ElegantError.displayName = 'ElegantError';

	ElegantError.propTypes = {
		text: PropTypes.string,
		fullScreen: PropTypes.bool,
	};
}

export default ElegantError;
