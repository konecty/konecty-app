import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 800,
		backgroundColor: theme.palette.background.paper,
	},
	tag: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(0.25),
	},
}));

const GeneralList = () => {
	const classes = useStyles();
	const [checked, setChecked] = React.useState([0]);

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List className={classes.root}>
			{[0, 1, 2, 3].map(value => {
				const labelId = `checkbox-list-label-${value}`;

				return (
					<ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={checked.indexOf(value) !== -1}
								tabIndex={-1}
								color="primary"
								disableRipple
								inputProps={{ 'aria-labelledby': labelId }}
							/>
						</ListItemIcon>
						<ListItemText id={labelId}>
							<Box>
								<Box display="flex" alignItems="center">
									<Typography variant="h6" component="h2">
										task_name
									</Typography>
									<Chip className={classes.tag} size="small" label="Basic" />
								</Box>
								<Typography variant="body2">due_time</Typography>
							</Box>
						</ListItemText>
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="more">
								<MoreVertIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				);
			})}
		</List>
	);
};

export default GeneralList;
