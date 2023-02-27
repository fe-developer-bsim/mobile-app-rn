import {SAVE_UTM, CLEAR_UTM} from '../actions/index.actions';

export default function ccCode (state = '', action) {
  switch (action.type) {
  case SAVE_UTM: {
    return action.payload;
  }
  case CLEAR_UTM: {
    return '';
  }
  default: {
    return state;
  }
  }
}