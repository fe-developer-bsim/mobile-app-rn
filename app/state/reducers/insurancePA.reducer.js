import {SET_INSURANCE_PA, CLEAR_INSURANCE_PA} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SET_INSURANCE_PA: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case CLEAR_INSURANCE_PA: {
    return {};
  }
  default:
    return state;
  }
}
