import {SAVE_CODE_TAG_FASTCODE, CLEAR_CODE_TAG_FASTCODE} from '../actions/index.actions';

export default function checkpoint (state = {}, action) {
  switch (action.type) {
  case SAVE_CODE_TAG_FASTCODE: {
    return action.payload;
  }
  case CLEAR_CODE_TAG_FASTCODE: {
    return {};
  }
  default: {
    return state;
  }
  }
}
