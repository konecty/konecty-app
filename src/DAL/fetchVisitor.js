import axios from 'axios';
import localForage from 'localforage';
import { get } from './api';

const fetchVisitor = async ({ rid, uid, parentUrl }) => {
	try {
		const token = await localForage.getItem('token');
		const headers = {
			'X-User-Id': uid,
			'X-Auth-Token': token,
		};

		const { data: { room } } = await axios.get(`${parentUrl}/api/v1/rooms.info?roomId=${rid}`, { headers });
		if (!room) {
			throw new Error(`Room not found wit id ${rid}`);
		}

		const { data: visitor } = await get(`/api/v2/livechat.visitor?visitorId=${room.v._id}`);
		return visitor;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default fetchVisitor;
