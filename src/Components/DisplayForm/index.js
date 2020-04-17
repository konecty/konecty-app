/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useTranslation } from 'react-i18next';
import useStyles from './useStyles';

const DisplayForm = ({ fields, title, editable, onSave }) => {
	const classes = useStyles();
	const { t } = useTranslation();
	const [editing, setEditing] = useState(false);
	const values = {};

	const onEditClick = () => {
		if (!editing) return setEditing(true);

		const modified = fields.reduce((acc, field) => {
			if (!field.onSave) return acc;

			// Convert string boolean to boolean
			if (field.boolean) {
				values[field.label] = values[field.label] === t('y') ? true : values[field.label] === t('n') ? false : null;
			}

			return field.onSave(acc, values[field.label]);
		}, {});

		onSave && onSave(modified);
		return setEditing(false);
	};

	const Field = props => {
		// If the field has a 'opts' prop, render a select
		if (editing && props.opts) {
			return (
				<FormControl className={classes.textFieldRoot}>
					<InputLabel htmlFor={props.label} classes={{ root: classes.label }}>
						{props.label}
					</InputLabel>
					<Select
						id={props.label}
						{...props}
						classes={{ root: classes.select, select: classes.input, icon: classes.selectIcon }}
					>
						{map(props.opts, opt => (
							<MenuItem value={opt} key={opt}>
								{opt}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			);
		}

		return (
			<TextField
				{...props}
				classes={{ root: classes.textFieldRoot }}
				InputProps={{
					classes: { root: classes.inputControl, input: classes.input, inputMultiline: classes.inputMultiline },
					readOnly: !editing,
				}}
				InputLabelProps={{
					classes: { root: classes.label },
				}}
			/>
		);
	};

	const renderField = field => {
		let { label, value = '', transformValue, ...props } = field;

		if (transformValue instanceof Function) {
			value = transformValue(value);
		}

		if (Array.isArray(value)) {
			value = value.join('\n');
			props.multiline = true;
		}

		if (String(value).length > 30) {
			props.multiline = true;
		}

		if (props.boolean) {
			props.opts = [t('y'), t('n')];
			value = value === true ? t('y') : value === false ? t('n') : null;
		}
		values[label] = value;

		const onChange = ({ target }) => (values[label] = target.value);
		return <Field key={label} label={label} defaultValue={value} onChange={onChange} size="small" {...props} />;
	};

	return (
		<Box my={4}>
			{(title || editable) && (
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="h5" component="h2" mb={0}>
						{title}
					</Typography>
					{editable &&
						(editing ? (
							<Button
								color="primary"
								variant="contained"
								size="small"
								className={classes.button}
								onClick={onEditClick}
								startIcon={<SaveIcon />}
							>
								Salvar
							</Button>
						) : (
							<Button
								color=""
								variant="contained"
								size="small"
								className={classes.button}
								onClick={onEditClick}
								startIcon={<EditIcon />}
							>
								Editar
							</Button>
						))}
				</Box>
			)}
			<Box>{map(fields, renderField)}</Box>
		</Box>
	);
};

if (process.env.__DEV__) {
	DisplayForm.displayName = 'DisplayForm';

	DisplayForm.propTypes = {
		title: PropTypes.string,
		editable: PropTypes.bool,
		onSave: PropTypes.func,
		fields: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				value: PropTypes.any,
				transformValue: PropTypes.func,
				opts: PropTypes.array,
			}),
		).isRequired,
	};
}

export default DisplayForm;
