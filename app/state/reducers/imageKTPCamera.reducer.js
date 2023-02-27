import {SAVE_DATA_KTP, CLEAR_DATA_KTP} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_DATA_KTP: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case CLEAR_DATA_KTP: {
    return {};
  }
  default:
    return state;
  }
}
