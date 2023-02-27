import {SAVE_ADD_CC_INSTALLMENT_TRX, CLEAR_ADD_CC_INSTALLMENT_TRX} from '../actions/index.actions';

export default function highlightText (state = false, action) {
  switch (action.type) {
  case SAVE_ADD_CC_INSTALLMENT_TRX: {
    return true;
  }
  case CLEAR_ADD_CC_INSTALLMENT_TRX: {
    return false;
  }
  default: {
    return state;
  }
  }
}
