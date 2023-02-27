import {SET_GAP_TIME_SERVER, CLEAR_GAP_TIME_SERVER} from '../actions/index.actions';

export default function timeout (state = 0, action) {
  switch (action.type) {
  case SET_GAP_TIME_SERVER: {
    return action.payload;
  }
  case CLEAR_GAP_TIME_SERVER: {
    return 0;
  }
  default: {
    return state;
  }
  }
}
