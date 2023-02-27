import {SET_APP_TIMEOUT, CLEAR_APP_TIMEOUT} from '../actions/index.actions';

export default function timeout (state = 300, action) {
  switch (action.type) {
  case SET_APP_TIMEOUT: {
    return action.payload;
  }
  case CLEAR_APP_TIMEOUT: {
    return 300;
  }
  default: {
    return state;
  }
  }
}
