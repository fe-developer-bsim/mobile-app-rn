import {QR_SET_MERCHANT, QR_CLEAR_MERCHANT} from '../actions/index.actions';

const defaultState = [];
export default function merchant (state = defaultState, action) {
  switch (action.type) {
  case QR_SET_MERCHANT: {
    return action.payload;
  }
  case QR_CLEAR_MERCHANT: {
    return defaultState;
  }
  default:
    return state;
  }
}
