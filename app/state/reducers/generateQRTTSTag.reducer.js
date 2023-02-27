import {SAVE_CODE_TAG_QRTTS, CLEAR_CODE_TAG_QRTTS} from '../actions/index.actions';

export default function checkpoint (state = {}, action) {
  switch (action.type) {
  case SAVE_CODE_TAG_QRTTS: {
    return action.payload;
  }
  case CLEAR_CODE_TAG_QRTTS: {
    return {};
  }
  default: {
    return state;
  }
  }
}
