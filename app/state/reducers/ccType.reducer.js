import {SAVE_CC_TYPE, CLEAR_CC_TYPE} from '../actions/index.actions';

export default function ccType (state = '', action) {
  switch (action.type) {
  case SAVE_CC_TYPE: {
    return action.payload;
  }
  case CLEAR_CC_TYPE: {
    return '';
  }
  default: {
    return state;
  }
  }
}
