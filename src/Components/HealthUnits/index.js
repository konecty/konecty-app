import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { get, map, startCase, toLower, chain } from 'lodash';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useTranslation } from 'react-i18next';
import selectHealthUnit from '../../DAL/mutations/healthUnit';

const HealthUnits = ({ healthUnits = [], contact }) => {
	const [selected, setSelected] = useState(get(contact, 'indicatedHealthUnit._id'));
	const [tooltip, setTooltip] = useState({});
	const { t, i18n } = useTranslation();

	const polite = string => startCase(toLower(string));
	const huDistance = string => {
		if (string) {
			const arr = string.toString().split('.');
			const res = [arr[0], arr[1].substring(0, 2)].join(',');
			return t('distance-from', { distance: res });
		}
		return '';
	};
	const huServices = hu =>
		chain(['hasAssistance', 'hasHospitalization', 'hasTestCollect'])
			.pickBy(v => !!hu[v])
			.map(v => t(v))
			.join(', ')
			.value();

	const isSelected = id => selected === id;
	const ttOpen = id => !!tooltip[id];

	const onSelect = id => () => {
		setSelected(id);
		selectHealthUnit({ contact, hu: id });

		setTimeout(() => setTooltip({}), 1000);
		setTooltip({ [id]: true });
	};

	// Text copied to clipboard when user selects a health unit
	// Defaults to portuguese to prevent user/client language difference
	const pt = i18n.cloneInstance({ lng: 'pt-BR' });
	const buildText = hu =>
		[
			`*${pt.t('indicated-health-unit')}*`,
			`*${pt.t('type')}:* ${hu.type}`,
			`*${pt.t('name')}:* ${polite(hu.name)}`,
			`*${pt.t('address')}:* ${polite(hu.address)}`,
			`*${pt.t('services')}:* ${huServices(hu)}`,
			`*${pt.t('distance')}:* ${huDistance(hu.distance)}`,
		].join('\n');

	return (
		<Box>
			<Box display="flex" justifyContent="space-between">
				<InputLabel>{t('nearest-health-unit')}</InputLabel>
				<InputLabel>{t('indicated')}</InputLabel>
			</Box>
			{map(healthUnits, hu => (
				<Box key={hu.name} mb={1.5}>
					<Box display="flex" justifyContent="space-between" alignItems="baseline">
						<Typography>{hu.type}</Typography>
						<CopyToClipboard text={buildText(hu)}>
							<Tooltip open={ttOpen(hu._id)} title={t('text-copied')} arrow>
								<Switch color="secondary" checked={isSelected(hu._id)} onChange={onSelect(hu._id)} />
							</Tooltip>
						</CopyToClipboard>
					</Box>
					<Typography variant="body1">{polite(hu.name)}</Typography>
					<Typography>{polite(hu.address)}</Typography>
					<Typography>{huServices(hu)}</Typography>
					<Typography>{huDistance(hu.distance)}</Typography>
				</Box>
			))}
		</Box>
	);
};

if (process.env.__DEV__) {
	HealthUnits.displayName = 'HealthUnits';

	HealthUnits.propTypes = {
		healthUnits: PropTypes.arrayOf([
			PropTypes.shape({
				_id: PropTypes.string,
				type: PropTypes.string,
				name: PropTypes.string,
				address: PropTypes.string,
				hasAssistance: PropTypes.bool,
				hasHospitalization: PropTypes.bool,
				hasTestCollect: PropTypes.bool,
				distance: PropTypes.number,
			}),
		]),
		contact: PropTypes.shape({
			_id: PropTypes.string,
			_updatedAt: PropTypes.string,
			indicatedHealthUnit: PropTypes.shape({
				_id: PropTypes.string,
			}),
		}),
	};
}

export default HealthUnits;
