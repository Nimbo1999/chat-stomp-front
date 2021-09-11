import HttpService from './HttpService';

import { API_CONSTANTS } from '../constants/api.constants';

class Messages extends HttpService{

    async getMessage(messageToken) {

        const url =
            API_CONSTANTS.MESSAGES.ROOT +
            API_CONSTANTS.URL_PARAM(messageToken);

        return await this.get(url);

    }

}

export default Messages;
