import {SAVE_MPIN, CLEAR_MPIN} from '../actions/index.actions';

export default function inputPinOTP (state = '', action) {
  switch (action.type) {
  case SAVE_MPIN: {
    return action.payload;
  }
  case CLEAR_MPIN: {
    return '';
  }
  default:
    return state;
  }
}
