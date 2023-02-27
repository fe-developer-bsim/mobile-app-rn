import {SAVE_FLIGHT_SCHEDULE, CLEAR_FLIGHT_SCHEDULE} from '../actions/index.actions';

export default function flightSchedule (state = {}, action) {
  switch (action.type) {
  case SAVE_FLIGHT_SCHEDULE: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case CLEAR_FLIGHT_SCHEDULE: {
    return {};
  }
  default:
    return state;
  }
}
