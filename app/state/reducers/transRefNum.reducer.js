import {SAVE_TRANS_REF_NUM, CLEAR_TRANS_REF_NUM} from '../actions/index.actions';

export default function transRefNum (state = '', action) {
  switch (action.type) {
  case SAVE_TRANS_REF_NUM: {
    return action.payload;
  }
  case CLEAR_TRANS_REF_NUM: {
    return '';
  }
  default: {
    return state;
  }
  }
}
