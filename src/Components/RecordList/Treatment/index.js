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

const TreatmentList = ({ items, onEdit }) => {
	const [expanded, setExpanded] = useState(null);
	const classes = useStyles();
	const { t } = useTranslation();

	const isExpanded = name => expanded === name;
	const onChange = name => () => setExpanded(isExpanded(name) ? false : name);
	const isOpen = ({ type, status }) => type === 'Atendimento Humano' && ['Em Andamento'].includes(status);

	if (!Array.isArray(items)) {
		return null;
	}

	// Theme defined colors
	const getColor = category => ({ Vermelha: 'statusRed', Amarela: 'statusYellow', Verde: 'statusGreen' }[category]);

	// Sort treatments newest first
	const sorted = orderBy(items, [item => new Date(item.startAt)], ['desc']);

	return (
		<div className={classes.root}>
			{map(sorted, item => (
				<Paper key={item._id} elevation={4} style={{ marginBottom: 15 }}>
					<ExpansionPanel expanded={isExpanded(item.code)} onChange={onChange(item.code)}>
						<ExpansionPanelSummary classes={{ root: classes.expansionSummary, content: classes.summaryContent }}>
							<Box width={1} display="flex" justifyContent="space-between" flexGrow={1} alignItems="center">
								<Box>
									<Typography variant="h6">{formatDate(item.startAt)}</Typography>
									{/* Category chip */}
									<Box
										bgcolor={`${getColor(item.category)}.main`}
										px={1}
										py={0.1}
										mb={1}
										display="inline-block"
										color={`${getColor(item.category)}.contrastText`}
										borderRadius={5}
									>
										<Typography variant="caption" component="span" style={{ verticalAlign: 'bottom' }}>
											{t('category')} {t(item.category).toLowerCase()}
										</Typography>
									</Box>
								</Box>
								{isOpen(item) && (
									<Button
										variant="contained"
										color="default"
										style={{ textTransform: 'none' }}
										size="small"
										onClick={onEdit(item)}
										disableElevation
									>
										{t('edit')}
									</Button>
								)}
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
		onEdit: PropTypes.func,
	};
}

export default TreatmentList;
