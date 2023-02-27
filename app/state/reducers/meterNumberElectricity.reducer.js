import {SAVE_METER_NUMBER, CLEAR_SAVE_METER_NUMBER} from '../actions/index.actions';

export default function referralCode (state = '', action) {
  switch (action.type) {
  case SAVE_METER_NUMBER: {
    return action.payload;
  }
  case CLEAR_SAVE_METER_NUMBER: {
    return '';
  }
  default: {
    return state;
  }
  }
}
