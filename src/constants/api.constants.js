export const API_CONSTANTS = {
    BASE_URL: 'http://localhost:8080',

    ROOM: {
        ROOMS: '/rooms',

        OPEN: '/open',

        CLOSE: '/close',

        CONTENT: '/content',

        USERS: '/users'
    },

    MESSAGES: {
        ROOT: '/messages'
    },

    WEB_SOCKET: {
        ROOT: '/ws',

        USER: '/user',

        QUEUE: '/queue',

        ROOMS: '/rooms',

        APP: '/app',

        CHAT: '/chat'
    },

    URL_PARAM: param => `/${param}`
};
