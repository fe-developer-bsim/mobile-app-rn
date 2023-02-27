import {HIGHLIGHT_NETWORK_BAR, RESET_NETWORK_BAR} from '../actions/index.actions';

export default function highlightText (state = false, action) {
  switch (action.type) {
  case HIGHLIGHT_NETWORK_BAR: {
    return true;
  }
  case RESET_NETWORK_BAR: {
    return false;
  }
  default: {
    return state;
  }
  }
}
