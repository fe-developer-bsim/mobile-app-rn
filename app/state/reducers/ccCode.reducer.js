import {SAVE_CC_CODE, CLEAR_CC_CODE} from '../actions/index.actions';

export default function ccCode (state = '', action) {
  switch (action.type) {
  case SAVE_CC_CODE: {
    return action.payload;
  }
  case CLEAR_CC_CODE: {
    return '';
  }
  default: {
    return state;
  }
  }
}
