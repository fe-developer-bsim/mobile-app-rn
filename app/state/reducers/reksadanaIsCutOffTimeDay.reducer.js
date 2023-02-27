import {SAVE_IS_CUT_OFF_TIME_DAY, CLEAR_IS_CUT_OFF_TIME_DAY} from '../actions/index.actions';

export default function reksadanaisCutOffTimeDayReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_IS_CUT_OFF_TIME_DAY: {
    return action.payload;
  }
  case CLEAR_IS_CUT_OFF_TIME_DAY: {
    return {};
  }
  default:
    return state;
  }
}
