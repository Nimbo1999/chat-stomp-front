import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// import { store } from '../redux/store';
// import { selectUserToken } from '../redux/user/userSlice.reducer';

import { API_CONSTANTS } from '../constants/api.constants';

// const onErrorConnecting = err => {
//     console.log('Error while connection to StopmServer!!!');
//     console.log(err);
// }

const initializeStompClient = () => {
    const socketConnection = new SockJS(API_CONSTANTS.BASE_URL.concat('/ws'));

    const stompClient = Stomp.over(socketConnection);

    // stompClient.connect(
    //     {},
    //     frame => onConnected(stompClient, frame),
    //     onErrorConnecting
    // );

    return stompClient;
}

export default initializeStompClient;
