import {SAVE_INQUIRY_POLIS, CLEAR_INQUIRY_POLIS} from '../actions/index.actions';

export default function smartInvestasiLinkPolis (state = [], action) {
  switch (action.type) {
  case SAVE_INQUIRY_POLIS: {
    return action.payload;
  }
  case CLEAR_INQUIRY_POLIS: {
    return [];
  }
  default:
    return state;
  }
}
