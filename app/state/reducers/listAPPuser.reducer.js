import {GET_APP_USER_ISTALLED, CLEAR_APP_USER_ISTALLED} from '../actions/index.actions';

export default function listAPPuser (state = [], action) {
  switch (action.type) {
  case GET_APP_USER_ISTALLED: {
    const listAPPuser = action.payload;
    return [...listAPPuser];
  }
  case CLEAR_APP_USER_ISTALLED: {
    return [];
  }
  default: {
    return state;
  }
  }
}
