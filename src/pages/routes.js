import HomePage from './home/Home';
import RoomPage from './room/Room';
import ChatPage from './chat/Chat';

import ROUTES_CONSTANTS from './routes.constants';

const routes = [
    {
        key: ROUTES_CONSTANTS.ROOM,
        path: ROUTES_CONSTANTS.ROOM,
        component: RoomPage
    },
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

export default routes;
