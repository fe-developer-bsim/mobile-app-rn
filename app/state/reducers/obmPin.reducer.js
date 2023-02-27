import {SAVE_PIN_OBM, CLEAR_PIN_OBM} from '../actions/index.actions';

export default function ccCode (state = '', action) {
  switch (action.type) {
  case SAVE_PIN_OBM: {
    return action.payload;
  }
  case CLEAR_PIN_OBM: {
    return '';
  }
  default: {
    return state;
  }
  }
}
