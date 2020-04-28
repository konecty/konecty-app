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
import CancelIcon from '@material-ui/icons/Clear';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonBase from '@material-ui/core/ButtonBase';

import { useTranslation } from 'react-i18next';
import useStyles from './useStyles';

const DisplayForm = ({ fields, title, editable, onSave, onSuccess, button }) => {
	const classes = useStyles();
	const { t } = useTranslation();
	const [editing, setEditing] = useState(false);
	const [errors, setErrors] = useState(null);
	const values = {};

	const onEditClick = () => {
		if (!editing) return setEditing(true);
		setErrors(null);

		const modified = fields.reduce((acc, field) => {
			if (!field.onSave) return acc;

			// Convert string boolean to boolean
			if (field.boolean) {
				values[field.label] = values[field.label] === t('y') ? true : values[field.label] === t('n') ? false : null;
			}

			return field.onSave(acc, values[field.label]);
		}, {});

		const promise = onSave && onSave(modified);
		if (promise && promise.then) {
			promise.then(res => {
				if (res && res.errors) {
					setErrors(res.errors);
				} else {
					onSuccess(modified);
				}
				setEditing(false);
			});
		} else {
			setEditing(false);
			onSuccess(modified);
		}
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
					classes: {
						root: editing ? classes.inputControl : classes.inputControlReadOnly,
						input: classes.input,
						inputMultiline: classes.inputMultiline,
					},
					readOnly: !editing,
				}}
				InputLabelProps={{
					classes: { root: classes.label, focused: editing ? undefined : classes.labelReadOnly },
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
			{errors && (
				<Box mb={2} py={2} px={1} bgcolor="error.main" color="common.white">
					{errors.map(err => (
						<li>{t(err)}</li>
					))}
				</Box>
			)}
			{(title || editable) && (
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="h5" component="h2" mb={0}>
						{title}
					</Typography>
					{editable &&
						(editing ? (
							<Box alignItems="flex-end">
								<ButtonBase
									color="default"
									variant="contained"
									size="small"
									className={classes.cancelButton}
									onClick={() => setEditing(false)}
								>
									<CancelIcon />
								</ButtonBase>
								<Button
									color="primary"
									variant="contained"
									size="small"
									className={classes.button}
									onClick={onEditClick}
									startIcon={<SaveIcon />}
								>
									{t('save')}
								</Button>
							</Box>
						) : (
							<Button
								variant="contained"
								size="small"
								className={classes.button}
								onClick={onEditClick}
								startIcon={<EditIcon />}
							>
								{t('edit')}
							</Button>
						))}

					{button && button}
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
		button: PropTypes.element,
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
