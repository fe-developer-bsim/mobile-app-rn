import {SAVE_QR_INVOICE, CLEAR_QR_INVOICE} from '../actions/index.actions';

export default function userApiKey (state = {}, action) {
  switch (action.type) {
  case SAVE_QR_INVOICE: {
    return action.payload;
  }
  case CLEAR_QR_INVOICE: {
    return {};
  }
  default: {
    return state;
  }
  }
}
