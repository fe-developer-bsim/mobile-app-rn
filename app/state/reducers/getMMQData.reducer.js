import {SAVE_MMQ_DATA, CLEAR_MMQ_DATA} from '../actions/index.actions';

export default function flightData (state = {}, action) {
  switch (action.type) {
  case SAVE_MMQ_DATA: {
    return action.payload;
  }
  case CLEAR_MMQ_DATA: {
    return {};
  }
  default: {
    return state;
  }
  }
}
