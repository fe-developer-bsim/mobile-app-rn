import {SAVE_DATA_PA, CLEAR_DATA_PA} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_DATA_PA: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case CLEAR_DATA_PA: {
    return {};
  }
  default:
    return state;
  }
}
