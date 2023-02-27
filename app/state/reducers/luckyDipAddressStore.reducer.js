import {SAVE_LUCKY_DIP_ADDRESS, CLEAR_LUCKY_DIP_ADDRESS} from '../actions/index.actions';

export default function loginPreference (state = {}, action) {
  switch (action.type) {
  case SAVE_LUCKY_DIP_ADDRESS: {
    const loginPreference = action.payload;
    return {...loginPreference};
  }
  case CLEAR_LUCKY_DIP_ADDRESS: {
    return {};
  }
  default:
    return state;
  }
}