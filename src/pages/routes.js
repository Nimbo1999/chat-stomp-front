import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserName } from '../redux/user/userSlice';

import HomePage from './home/Home';
import ChatPage from './chat/Chat';

import ROUTES_CONSTANTS from './routes.constants';

const routes = [
    {
        key: ROUTES_CONSTANTS.CHAT,
        path: ROUTES_CONSTANTS.CHAT,
        exact: true,
        component: ChatPage
    },
    {
        key: ROUTES_CONSTANTS.HOME,
        path: ROUTES_CONSTANTS.HOME,
        exact: true,
        component: HomePage
    },
];

function AppRoute({ path, exact, component }) {
    const hasUser = useSelector(selectUserName);

    if (!hasUser && path !== ROUTES_CONSTANTS.HOME) return <Redirect to={ROUTES_CONSTANTS.HOME} />

    return <Route path={path} exact={exact} component={component} />

}

export {routes as default, AppRoute};
