import {SAVE_LV_TRXID, CLEAR_LV_TRXID} from '../actions/index.actions';

export default function livenessTrxID (state = '', action) {
  switch (action.type) {
  case SAVE_LV_TRXID: {
    return action.payload;
  }
  case CLEAR_LV_TRXID: {
    return '';
  }
  default: {
    return state;
  }
  }
}
