import {SAVE_USER_API_KEY, CLEAR_USER_API_KEY} from '../actions/index.actions';

export default function userApiKey (state = '', action) {
  switch (action.type) {
  case SAVE_USER_API_KEY: {
    return action.payload;
  }
  case CLEAR_USER_API_KEY: {
    return '';
  }
  default: {
    return state;
  }
  }
}
