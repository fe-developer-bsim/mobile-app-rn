import {SAVE_CASH_MODAL, CLEAR_CASH_MODAL} from '../actions/index.actions';

export default function showCardlessGuide (state = '', action) {
  switch (action.type) {
  case SAVE_CASH_MODAL: {
    return action.payload;
  }
  case CLEAR_CASH_MODAL: {
    return '';
  }
  default: {
    return state;
  }
  }
}
