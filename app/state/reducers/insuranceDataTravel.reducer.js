import {SAVE_DATA_TRAVEL, CLEAR_DATA_TRAVEL} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_DATA_TRAVEL: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case CLEAR_DATA_TRAVEL: {
    return {};
  }
  default:
    return state;
  }
}
