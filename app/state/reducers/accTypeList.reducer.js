import {SAVE_ACC_TYPE, CLEAR_ACC_TYPE} from '../actions/index.actions';

export default function timeout (state = {}, action) {
  switch (action.type) {
  case SAVE_ACC_TYPE: {
    return action.payload;
  }
  case CLEAR_ACC_TYPE: {
    return {};
  }
  default: {
    return state;
  }
  }
}
