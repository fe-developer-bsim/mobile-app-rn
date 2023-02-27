import {SAVE_INQUIRY_PROXY_BY_EDW, CLEAR_INQUIRY_PROXY_BY_EDW} from '../actions/index.actions';

export default function inquiryProxyByEDW (state = {}, action) {
  switch (action.type) {
  case SAVE_INQUIRY_PROXY_BY_EDW: {
    return action.payload;
  }
  case CLEAR_INQUIRY_PROXY_BY_EDW: {
    return {};
  }
  default:
    return state;
  }
}
