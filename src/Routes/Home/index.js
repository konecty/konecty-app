import React from 'react';
import Link from '../../Components/Link';

const Home = () => (
	<>
		<h1>Hello from home</h1>
		<ul>
			<li>
				<Link to="/login">Login</Link>
			</li>

			<li>
				<Link to="/state-sample">State Sample</Link>
			</li>
		</ul>
	</>
);

export default Home;
