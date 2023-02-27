import {SAVE_DATA_TX_TRAVEL_PASSENGER_LIST, CLEAR_DATA_TX_TRAVEL_PASSENGER_LIST} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_DATA_TX_TRAVEL_PASSENGER_LIST: {
    return action.payload;
  }
  case CLEAR_DATA_TX_TRAVEL_PASSENGER_LIST: {
    return {};
  }
  default:
    return state;
  }
}
