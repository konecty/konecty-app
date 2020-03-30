import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';

import useStyles from './useStyle';

const TreatmentList = ({ items }) => {
	const [expanded, setExpanded] = useState(null);
	const classes = useStyles();
	const { t } = useTranslation();

	const isExpanded = name => expanded === name;
	const onChange = name => () => setExpanded(isExpanded(name) ? false : name);

	if (!Array.isArray(items)) {
		return t('no-treatments');
	}

	return (
		<div className={classes.root}>
			{map(items, item => (
				<ExpansionPanel key={item._id} expanded={isExpanded(item.code)} onChange={onChange(item.code)}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>{item.status}&nbsp;</Typography>
						{item.description && <Typography color="textSecondary">{item.description.substr(0, 10)}</Typography>}
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.details}>
						<div>
							{item.nextStep && (
								<Typography gutterBottom>
									<b>{t('next-step')}:</b> {item.nextStep}
								</Typography>
							)}
							{item.notes && (
								<Typography gutterBottom>
									<b>{t('notes')}:</b> {item.notes}
								</Typography>
							)}
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
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
