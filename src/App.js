import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './pages/routes';

function App() {
	return (
		<Switch>
			{routes.map(page => (
				<Route {...page} />
			))}
		</Switch>
	);
}

export default App;
