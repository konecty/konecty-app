import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import RecordList from '../../Components/RecordList';
import AppBarItem from './AppBarItem';

const useStyles = makeStyles(theme => ({
	box: {
		background: theme.palette.primary.main,
		color: 'white',
		padding: theme.spacing(2),
	},
	title: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(0),
	},
	chip: {
		marginRight: theme.spacing(1),
	},
	root: {
		'& .MuiTextField-root': {
			display: 'block',
			margin: theme.spacing(2, 0),
			width: 200,
		},
	},
}));

export default function index() {
	const classes = useStyles();
	return (
		<>
			<AppBarItem />
			<Box className={classes.box}>
				<Container maxWidth="sm">
					<Typography variant="h4" component="h1" className={classes.title}>
						Record title
					</Typography>
					<Box>
						<Chip color="white" label="Status" className={classes.chip} />
						<Chip color="white" label="Type" className={classes.chip} />
					</Box>
				</Container>
			</Box>
			<Container maxWidth="sm" className={classes.root}>
				<Box my={2}>
					<Typography variant="h5" component="h2" className={classes.title}>
						Personal data
					</Typography>
					<TextField label="Size" id="standard-size-small" defaultValue="Small" size="small" />
					<TextField label="Size" id="standard-size-small" defaultValue="Small" size="small" />
					<TextField label="Size" id="standard-size-small" defaultValue="Small" size="small" />
					<TextField label="Size" id="standard-size-small" defaultValue="Small" size="small" />
				</Box>
				<Box my={2}>
					<Typography variant="h5" component="h2" className={classes.title}>
						Medical care
					</Typography>
					<RecordList />
				</Box>
				<Box my={2}>
					<Typography variant="h5" component="h2" className={classes.title}>
						Activities
					</Typography>
					<RecordList />
				</Box>
			</Container>
		</>
	);
}
