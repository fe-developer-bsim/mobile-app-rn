import {UPDATE_LOGIN, CLEAR_LOGIN} from '../actions/index.actions';

export default function showSpinner (state = 'easypin', action) {
  switch (action.type) {
  case UPDATE_LOGIN: {
    return action.payload;
  }
  case CLEAR_LOGIN: {
    return 'easypin';
  }
  default: {
    return state;
  }
  }
}
