import {SAVE_TOOGLE_MENU_KOPERASI, DELETE_TOOGLE_MENU_KOPERASI} from '../actions/index.actions';

export default function toogleMenuKoperasi (state = '', action) {
  switch (action.type) {
  case SAVE_TOOGLE_MENU_KOPERASI: {
    return action.payload;
  }
  case DELETE_TOOGLE_MENU_KOPERASI: {
    return '';
  }
  default: {
    return state;
  }
  }
}
