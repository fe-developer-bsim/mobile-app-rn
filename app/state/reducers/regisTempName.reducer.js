import {SAVE_REGIST_NAME, CLEAR_REGIST_NAME} from '../actions/index.actions';

export default function registTempName (state = '', action) {
  switch (action.type) {
  case SAVE_REGIST_NAME: {
    return action.payload;
  }
  case CLEAR_REGIST_NAME: {
    return '';
  }
  default: {
    return state;
  }
  }
}
