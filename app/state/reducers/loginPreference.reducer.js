import {SAVE_LOGIN_PREFERENCE, CLEAR_LOGIN_PREFERENCE} from '../actions/index.actions';

export default function loginPreference (state = {}, action) {
  switch (action.type) {
  case SAVE_LOGIN_PREFERENCE: {
    const loginPreference = action.payload;
    return {...loginPreference};
  }
  case CLEAR_LOGIN_PREFERENCE: {
    return {};
  }
  default:
    return state;
  }
}