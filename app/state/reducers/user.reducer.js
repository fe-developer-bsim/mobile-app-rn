import {USER_UPDATE_METADATA, USER_CLEAR} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case USER_UPDATE_METADATA: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case USER_CLEAR: {
    return {};
  }
  default:
    return state;
  }
}
