/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { map, orderBy, concat, without, filter } from 'lodash';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import DisplayForm from '../../DisplayForm';
import Bot from '../../Icons/Bot';
import MD from '../../Icons/MD';
import useStyles from './useStyle';
import { formatDate } from '../../../Util/format';
import getFields from './fields';

const TreatmentList = ({ items, onEdit }) => {
	const [expanded, setExpanded] = useState(null);
	const classes = useStyles();
	const theme = useTheme();
	const { t } = useTranslation();
	const { parentUrl } = useSelector(({ app }) => app);

	const isExpanded = name => expanded === name;
	const onChange = name => () => setExpanded(isExpanded(name) ? false : name);
	const isOpen = ({ type, status }) => type === 'Atendimento Humano' && ['Em Andamento'].includes(status);

	if (!Array.isArray(items)) {
		return null;
	}

	// Theme defined colors
	const getColor = category => ({ Vermelha: 'statusRed', Amarela: 'statusYellow', Verde: 'statusGreen' }[category]);

	// Sort treatments newest first
	const filtered = filter(items, item => item.status !== 'Em Andamento');
	const sorted = orderBy(filtered, [item => new Date(item.startAt)], ['desc']);

	return (
		<div className={classes.root}>
			{map(sorted, item => (
				<Paper key={item._id} elevation={4} style={{ marginBottom: 15 }}>
					<ExpansionPanel expanded={isExpanded(item.code)} onChange={onChange(item.code)}>
						<ExpansionPanelSummary classes={{ root: classes.expansionSummary, content: classes.summaryContent }}>
							<Box width={1} display="flex" justifyContent="space-between" flexGrow={1} alignItems="center">
								<Avatar style={{ marginRight: theme.spacing(2), backgroundColor: '#00000022' }}>
									{item.type === 'Atendimento Automático' ? <Bot /> : <MD />}
								</Avatar>
								<Box flexGrow={1} flexShrink={1}>
									<Box display="flex" justifyContent="space-between" alignItems="center">
										<Typography variant="h6">
											{item.startAt ? formatDate(item.startAt) : t('current-opportunity')}
										</Typography>
										{/* Category chip */}
										<Box
											bgcolor={`${getColor(item.category)}.main`}
											px={1}
											py={0.1}
											display="inline-block"
											color={`${getColor(item.category)}.contrastText`}
											borderRadius={5}
										>
											<Typography variant="caption" component="span" style={{ verticalAlign: 'bottom' }}>
												{t('category')} {t(item.category).toLowerCase()}
											</Typography>
										</Box>
									</Box>
									{isOpen(item) ? (
										<Button
											color="primary"
											style={{ textTransform: 'none', padding: 0 }}
											size="small"
											onClick={onEdit}
											disableElevation
										>
											{t('edit-opportunity')}
										</Button>
									) : (
										<Box display="flex" flexWrap="wrap">
											<Typography
												variant="caption"
												style={{
													maxWidth: 250,
													whiteSpace: 'wrap',
													flexBasis: '100%',
												}}
												color="textSecondary"
											>
												{without(concat(item.severeSymptoms, item.mildSymptoms), undefined, null)
													.join(', ')
													.replace(/\s?\(.*?\)\s?,?/gi, '')}
											</Typography>
											{item.livechatId && parentUrl && (
												<>
													<br />
													<Link
														onClick={e => {
															e.stopPropagation();

															// Use window open to open on browser
															window.open(
																`${parentUrl}/live/${item.livechatId}`,
																'_blank',
																'width=1280,height=950',
															);

															// Use window.parent open to open on electron app
															window.parent.open(
																`${parentUrl}/live/${item.livechatId}`,
																'_blank',
																'width=1280,height=950',
															);
														}}
													>
														{t('message-history')}
													</Link>
												</>
											)}
										</Box>
									)}
								</Box>
							</Box>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<DisplayForm fields={getFields({ t, data: item })} />
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
