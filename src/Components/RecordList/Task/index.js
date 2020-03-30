import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/styles';

import useStyles from './useStyle';

const TaskList = ({ items }) => {
	const classes = useStyles();
	const theme = useTheme();
	const { t } = useTranslation();

	if (!Array.isArray(items)) {
		return t('no-tasks');
	}

	const priorities = {
		Alta: 'statusRed',
		Média: 'statusYellow',
		Baixa: 'statusGreen',
	};

	return (
		<div>
			{map(items, item => (
				<Paper key={item._id}>
					<Toolbar style={{ backgroundColor: theme.palette[priorities[item.priority]].color }}>
						<Typography className={classes.heading}>{item.priority}</Typography>
						<Typography>{item.subject}</Typography>
					</Toolbar>

					<Box className={classes.content} px={2}>
						<Box mt={1} display="flex" justifyContent="space-between">
							{item.startAt && (
								<div className={classes.subHeader}>
									<AccessTimeIcon fontSize="small" />
									<Typography variant="body2">{new Date(item.startAt).toLocaleDateString()}</Typography>
								</div>
							)}
							{item.endAt && (
								<div className={classes.subHeader}>
									<AccessTimeIcon fontSize="small" />
									<Typography variant="body2">{new Date(item.endAt).toLocaleDateString()}</Typography>
								</div>
							)}
						</Box>

						<Box my={2}>
							{item.reason && (
								<Typography>
									<b>{t('reason')}:</b> {item.reason}
								</Typography>
							)}
							{item.description && <Typography color="textSecondary">{item.description}</Typography>}
						</Box>
					</Box>
				</Paper>
			))}
		</div>
	);
};

if (process.env.__DEV__) {
	TaskList.displayName = 'TaskList';

	TaskList.propTypes = {
		items: PropTypes.arrayOf(PropTypes.object),
	};
}

export default TaskList;
