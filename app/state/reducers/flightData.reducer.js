import {SAVE_FLIGHT_DATA, CLEAR_FLIGHT_DATA} from '../actions/index.actions';

export default function flightData (state = {}, action) {
  switch (action.type) {
  case SAVE_FLIGHT_DATA: {
    return action.payload;
  }
  case CLEAR_FLIGHT_DATA: {
    return {};
  }
  default: {
    return state;
  }
  }
}
