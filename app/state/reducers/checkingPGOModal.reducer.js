import {SAVE_FLAG_CHECKING_MODAL, CLEAR_FLAG_CHECKING_MODAL} from '../actions/index.actions';

export default function checkingPGOModal (state = '', action) {
  switch (action.type) {
  case SAVE_FLAG_CHECKING_MODAL: {
    return action.payload;
  }
  case CLEAR_FLAG_CHECKING_MODAL: {
    return '';
  }
  default: {
    return state;
  }
  }
}