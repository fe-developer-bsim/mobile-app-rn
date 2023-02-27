import {SAVE_ADD_PROXY_ADDRESS, CLEAR_ADD_PROXY_ADDRESS} from '../actions/index.actions';

export default function addProxyAddress (state = [], action) {
  switch (action.type) {
  case SAVE_ADD_PROXY_ADDRESS: {
    return action.payload;
  }
  case CLEAR_ADD_PROXY_ADDRESS: {
    return [];
  }
  default:
    return state;
  }
}
