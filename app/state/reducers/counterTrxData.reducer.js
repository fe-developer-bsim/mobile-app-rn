import {SAVE_COUNTER_TRX_DATA, CLEAR_COUNTER_TRX_DATA} from '../actions/index.actions';

export default function counterTrxData (state = false, action) {
  switch (action.type) {
  case SAVE_COUNTER_TRX_DATA: {
    return action.payload;
  }
  case CLEAR_COUNTER_TRX_DATA: {
    return '';
  }
  default: {
    return state;
  }
  }
}