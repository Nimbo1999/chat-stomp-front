import { STOMP_SUBSCRIPTION_IDS } from '../constants/stomp.constants';

export function getHallSubscriptionId(userToken) {
    return STOMP_SUBSCRIPTION_IDS.HALL.concat(userToken);
}

export function getRoomSubscriptionId(userToken, roomToken) {
    return STOMP_SUBSCRIPTION_IDS.ROOM.concat(`${userToken}-${roomToken}`);
}
