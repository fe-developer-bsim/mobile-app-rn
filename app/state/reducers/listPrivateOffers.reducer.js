import {SAVE_PRIVATE_OFFERS, CLEAR_PRIVATE_OFFERS} from '../actions/index.actions';

export default function listPrivateOffers (state = [], action) {
  switch (action.type) {
  case SAVE_PRIVATE_OFFERS: {
    return action.payload;
  }
  case CLEAR_PRIVATE_OFFERS: {
    return [];
  }
  default:
    return state;
  }
}