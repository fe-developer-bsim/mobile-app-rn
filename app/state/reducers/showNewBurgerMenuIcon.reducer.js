import {SAVE_NEW_BURGER_MENU, CLEAR_NEW_BURGER_MENU} from '../actions/index.actions';

export default function showNewBurgerMenuIcon (state = {}, action) {
  switch (action.type) {
  case SAVE_NEW_BURGER_MENU: {
    return action.payload;
  }
  case CLEAR_NEW_BURGER_MENU: {
    return {};
  }
  default: {
    return state;
  }
  }
}
