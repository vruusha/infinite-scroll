import moment from 'moment';
moment().format();

import { ONLINE_STATUS } from '../../enums';

/***
 * Returns lastseen status calculated by getting diff from current time
 * @param {string} dateString The date string to calculate status
 */
function lastSeenStatus(dateString) {

    var lastSeenDate = moment(dateString, true);

    //Checks for null, empty string and Invalid Date format
    if (!lastSeenDate.isValid()) {
        throw new Error('Invalid date', lastSeenDate);
    }

    let status = '';
    let currentDate = moment();
    let dateDiff = currentDate.diff(lastSeenDate);

    if (dateDiff < 0) {
        //if date is in past throw error
        throw new Error('Invalid Date, last seen date should be in past', lastSeenDate);
    } else if (dateDiff === 0) {
        //If user is online, show online status
        status = ONLINE_STATUS;
    } else {
        //else calculate and show the last seen date
        status = lastSeenDate.fromNow();
    }

    return status;
}

export {lastSeenStatus}