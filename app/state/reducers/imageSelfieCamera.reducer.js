import {SAVE_DATA_SELFIE, CLEAR_DATA_SELFIE} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_DATA_SELFIE: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case CLEAR_DATA_SELFIE: {
    return {};
  }
  default:
    return state;
  }
}
