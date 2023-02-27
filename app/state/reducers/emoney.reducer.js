import {EMONEY_UPDATE, EMONEY_CLEAR} from '../actions/index.actions';

export default function emoney (state = {}, action) {
  switch (action.type) {
  case EMONEY_UPDATE: {
    return action.payload;
  }
  case EMONEY_CLEAR: {
    return {};
  }
  default: {
    return state;
  }
  }
}
