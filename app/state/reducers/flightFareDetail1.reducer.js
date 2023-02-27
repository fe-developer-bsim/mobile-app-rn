import {SAVE_FLIGHT_DETAIL1, CLEAR_FLIGHT_DETAIL1} from '../actions/index.actions';

export default function flightFareDetail1 (state = {}, action) {
  switch (action.type) {
  case SAVE_FLIGHT_DETAIL1: {
    return action.payload;
  }
  case CLEAR_FLIGHT_DETAIL1: {
    return {};
  }
  default: {
    return state;
  }
  }
}
