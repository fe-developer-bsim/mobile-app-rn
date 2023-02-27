import {SAVE_PROXY_RESOLUTION, CLEAR_PROXY_RESOLUTION} from '../actions/index.actions';

export default function proxyResolution (state = {}, action) {
  switch (action.type) {
  case SAVE_PROXY_RESOLUTION: {
    return action.payload;
  }
  case CLEAR_PROXY_RESOLUTION: {
    return {};
  }
  default:
    return state;
  }
}
