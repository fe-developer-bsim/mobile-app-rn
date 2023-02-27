import {SET_INSURANCE_TRAVEL, CLEAR_INSURANCE_TRAVEL} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SET_INSURANCE_TRAVEL: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case CLEAR_INSURANCE_TRAVEL: {
    return {};
  }
  default:
    return state;
  }
}
