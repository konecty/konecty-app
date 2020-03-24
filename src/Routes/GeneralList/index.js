import React from 'react';
import Container from '@material-ui/core/Container';
import RecordList from '../../Components/RecordList';
import AppBarList from './AppBarList';

const GeneralList = () => {
	return (
		<>
			<AppBarList />
			<Container maxWidth="sm">
				<RecordList members />
			</Container>
		</>
	);
};

export default GeneralList;
