export const API_CONSTANTS = {
    BASE_URL: 'http://localhost:8080',

    ROOM: {

        ROOMS: '/rooms',

        OPEN: '/open',

        CLOSE: '/close',

        CONTENT: '/content',

    },

    WEB_SOCKET: {

        ROOT: '/ws',

        USER: '/user',

        QUEUE: '/queue',

        MESSAGES: '/messages',

    },

    URL_PARAM: param => `/${param}`,
}
