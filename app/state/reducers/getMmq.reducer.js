import {SAVE_INQUIRY_MMQ, CLEAR_INQUIRY_MMQ} from '../actions/index.actions';

export default function getMmq (state = {}, action) {
  switch (action.type) {
  case SAVE_INQUIRY_MMQ: {
    return action.payload;
  }
  case CLEAR_INQUIRY_MMQ: {
    return {};
  }
  default: {
    return state;
  }
  }
}