import {SAVE_INFORMATION_LIST_ETAX} from '../actions/index.actions';

export default function etaxInformation (state = {}, action) {
  switch (action.type) {
  case SAVE_INFORMATION_LIST_ETAX: {
    return action.payload;
  }
  default: {
    return state;
  }
  }
}
