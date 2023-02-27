import {SAVE_USER_MEMBER_DATA, CLEAR_USER_MEMBER_DATA} from '../actions/index.actions';

export default function memberUser (state = '', action) {
  switch (action.type) {
  case SAVE_USER_MEMBER_DATA: {
    return action.payload;
  }
  case CLEAR_USER_MEMBER_DATA: {
    return '';
  }
  default: {
    return state;
  }
  }
}
