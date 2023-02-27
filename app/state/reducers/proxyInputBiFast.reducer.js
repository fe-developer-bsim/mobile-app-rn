import {SAVE_PROXY_INPUT_BIFAST, CLEAR_PROXY_INPUT_BIFAST} from '../actions/index.actions';

export default function proxyResolutionCT (state = '', action) {
  switch (action.type) {
  case SAVE_PROXY_INPUT_BIFAST: {
    return action.payload;
  }
  case CLEAR_PROXY_INPUT_BIFAST: {
    return '';
  }
  default:
    return state;
  }
}
