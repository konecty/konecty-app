import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { map, orderBy } from 'lodash';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { useTranslation } from 'react-i18next';
import DisplayForm from '../../DisplayForm';
import useStyles from './useStyle';
import { formatDate } from '../../../Util/format';
import getFields from '../../../Routes/Detail/fields';

const TreatmentList = ({ items }) => {
	const [expanded, setExpanded] = useState(null);
	const classes = useStyles();
	const { t } = useTranslation();

	const isExpanded = name => expanded === name;
	const onChange = name => () => setExpanded(isExpanded(name) ? false : name);
	const isOpen = ({ status }) => ['Em Andamento', 'Encaminhado'].includes(status);

	if (!Array.isArray(items)) {
		return null;
	}

	// Theme defined colors
	const getColor = category =>
		({ Vermelha: 'statusRed.main', Amarela: 'statusYellow.main', Verde: 'statusGreen.main' }[category]);

	// Sort treatments newest first
	const sorted = orderBy(items, [item => new Date(item.startAt)], ['desc']);

	return (
		<div className={classes.root}>
			{map(sorted, item => (
				<Paper key={item._id} elevation={4} style={{ marginBottom: 15 }}>
					<ExpansionPanel expanded={isExpanded(item.code)} onChange={onChange(item.code)}>
						<ExpansionPanelSummary>
							<Box width={1}>
								<Box display="flex" justifyContent="space-between" flexGrow={1} alignItems="center">
									<Typography variant="subtitle2">{formatDate(item.startAt)}</Typography>
									{isOpen(item) && (
										<Button
											variant="contained"
											color="default"
											style={{ textTransform: 'none' }}
											size="small"
											disableElevation
										>
											{t('edit')}
										</Button>
									)}
								</Box>

								{/* Category chip */}
								<Box
									bgcolor={getColor(item.category)}
									px={0.5}
									py={0.1}
									display="inline"
									color="white"
									borderRadius={5}
								>
									<Typography variant="caption" component="span" style={{ verticalAlign: 'bottom' }}>
										{t('category')} {t(item.category).toLowerCase()}
									</Typography>
								</Box>
							</Box>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<DisplayForm fields={getFields({ t, contact: item, setContact: () => null }).healthstatusFields} />
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</Paper>
			))}
		</div>
	);
};

if (process.env.__DEV__) {
	TreatmentList.displayName = 'TreatmentList';

	TreatmentList.propTypes = {
		items: PropTypes.arrayOf(PropTypes.object),
	};
}

export default TreatmentList;
