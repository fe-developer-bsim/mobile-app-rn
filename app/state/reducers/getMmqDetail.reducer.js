import {SAVE_MMQ_DETAIL, CLEAR_MMQ_DETAIL} from '../actions/index.actions';

export default function getMmqDetail (state = {}, action) {
  switch (action.type) {
  case SAVE_MMQ_DETAIL: {
    return action.payload;
  }
  case CLEAR_MMQ_DETAIL: {
    return {};
  }
  default: {
    return state;
  }
  }
}