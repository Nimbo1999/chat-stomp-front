import React from 'react';
import { Switch } from 'react-router-dom';

import routes, { AppRoute } from './pages/routes';

function App() {
	return (
		<Switch>
			{routes.map(({key, ...props}) => (
				<AppRoute key={key} {...props} />
			))}
		</Switch>
	);
}

export default App;
