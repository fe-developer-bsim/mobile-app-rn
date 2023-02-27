import {SAVE_CONFIG_CACHE, CLEAR_CONFIG_CACHE} from '../actions/index.actions';

export default function billerCode (state = '', action) {
  switch (action.type) {
  case SAVE_CONFIG_CACHE: {
    return action.payload;
  }
  case CLEAR_CONFIG_CACHE: {
    return '';
  }
  default: {
    return state;
  }
  }
}
