import {SAVE_CC_PERIOD_INS, CLEAR_CC_PERIOD_INS} from '../actions/index.actions';

export default function timeout (state = [], action) {
  switch (action.type) {
  case SAVE_CC_PERIOD_INS: {
    return action.payload;
  }
  case CLEAR_CC_PERIOD_INS: {
    return [];
  }
  default: {
    return state;
  }
  }
}
