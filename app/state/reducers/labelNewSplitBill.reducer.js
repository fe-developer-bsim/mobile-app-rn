import {SAVE_LABEL_NEW_SPLITBILL, CLEAR_LABEL_NEW_SPLITBILL} from '../actions/index.actions';

export default function labelNewSplitBill (state = {}, action) {
  switch (action.type) {
  case SAVE_LABEL_NEW_SPLITBILL: {
    return action.payload;
  }
  case CLEAR_LABEL_NEW_SPLITBILL: {
    return '';
  }
  default:
    return state;
  }
}
