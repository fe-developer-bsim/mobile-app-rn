import {SAVE_DATA_TX_TRAVEL_DETAIL, CLEAR_DATA_TX_TRAVEL_DETAIL} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_DATA_TX_TRAVEL_DETAIL: {
    return action.payload;
  }
  case CLEAR_DATA_TX_TRAVEL_DETAIL: {
    return {};
  }
  default:
    return state;
  }
}
