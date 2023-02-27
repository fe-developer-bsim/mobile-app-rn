import {SAVE_IS_RESPONSE_UNIT, CLEAR_IS_RESPONSE_UNIT} from '../actions/index.actions';

export default function reksadanaisResponseUnit (state = {}, action) {
  switch (action.type) {
  case SAVE_IS_RESPONSE_UNIT: {
    return action.payload;
  }
  case CLEAR_IS_RESPONSE_UNIT: {
    return {};
  }
  default:
    return state;
  }
}
