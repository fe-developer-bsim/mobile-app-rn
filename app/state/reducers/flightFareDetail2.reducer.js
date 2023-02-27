import {SAVE_FLIGHT_DETAIL2, CLEAR_FLIGHT_DETAIL2} from '../actions/index.actions';

export default function flightFareDetail2 (state = {}, action) {
  switch (action.type) {
  case SAVE_FLIGHT_DETAIL2: {
    return action.payload;
  }
  case CLEAR_FLIGHT_DETAIL2: {
    return {};
  }
  default: {
    return state;
  }
  }
}
