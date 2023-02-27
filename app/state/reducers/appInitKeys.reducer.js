import {APP_INIT_KEYS_SAVE, APP_INIT_KEYS_CLEAR} from '../actions/index.actions';

export default function appInitKeys (state = {}, action) {
  switch (action.type) {
  case APP_INIT_KEYS_SAVE: {
    return action.payload;
  }
  case APP_INIT_KEYS_CLEAR: {
    return {};
  }
  default: {
    return state;
  }
  }
}
