/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';

import PropTypes from 'prop-types';

const Link = ({
	to,
	replace,
	innerRef,
	onClick,
	target,
	children,
	classes,
	className,
	color,
	onBlur,
	onFocus,
	TypographyClasses,
	underline,
	variant,
}) => (
	<MaterialLink
		component={RouterLink}
		to={to}
		replace={replace}
		innerRef={innerRef}
		onClick={onClick}
		target={target}
		classes={classes}
		className={className}
		color={color}
		onBlur={onBlur}
		onFocus={onFocus}
		TypographyClasses={TypographyClasses}
		underline={underline}
		variant={variant}
	>
		{children}
	</MaterialLink>
);

if (process.env.__DEV__) {
	Link.displayName = 'KonectyLink';
	const toType = PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]);
	const refType = PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.shape({ current: PropTypes.any })]);

	Link.propTypes = {
		innerRef: refType,
		onClick: PropTypes.func,
		replace: PropTypes.bool,
		target: PropTypes.string,
		to: toType.isRequired,
		children: PropTypes.node.isRequired,
		classes: PropTypes.object,
		className: PropTypes.string,
		color: PropTypes.oneOf(['default', 'error', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary']),
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
		TypographyClasses: PropTypes.object,
		underline: PropTypes.oneOf(['none', 'hover', 'always']),
		variant: PropTypes.string,
	};
}

export default Link;
