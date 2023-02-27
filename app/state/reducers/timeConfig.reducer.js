import {SAVE_CONFIG_TIME, CLEAR_CONFIG_TIME} from '../actions/index.actions';

export default function accounts (state = {}, action) {
  switch (action.type) {
  case SAVE_CONFIG_TIME: {
    return action.payload;
  }
  case CLEAR_CONFIG_TIME: {
    return {};
  }
  default: {
    return state;
  }
  }
}
