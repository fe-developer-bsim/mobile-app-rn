import {SAVE_PROXY_RESOLUTION_CT, CLEAR_PROXY_RESOLUTION_CT} from '../actions/index.actions';

export default function proxyResolutionCT (state = {}, action) {
  switch (action.type) {
  case SAVE_PROXY_RESOLUTION_CT: {
    return action.payload;
  }
  case CLEAR_PROXY_RESOLUTION_CT: {
    return {};
  }
  default:
    return state;
  }
}
