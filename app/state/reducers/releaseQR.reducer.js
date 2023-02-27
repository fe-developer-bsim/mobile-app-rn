import {SAVE_RELEASE_QR_DATA, CLEAR_RELEASE_QR_DATA} from '../actions/index.actions';

export default function releaseQR (state = {}, action) {
  switch (action.type) {
  case SAVE_RELEASE_QR_DATA: {
    return action.payload;
  }
  case CLEAR_RELEASE_QR_DATA: {
    return {};
  }
  default:
    return state;
  }
}
