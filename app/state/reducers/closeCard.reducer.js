import {SAVE_CLOSE_CARD_DETAILS, CLEAR_CLOSE_CARD_DETAILS} from '../actions/index.actions';

export default function closeCardDetails (state = {}, action) {
  switch (action.type) {
  case SAVE_CLOSE_CARD_DETAILS: {
    return action.payload;
  }
  case CLEAR_CLOSE_CARD_DETAILS: {
    return [];
  }
  default:
    return state;
  }
}
