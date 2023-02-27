import {SAVE_LANDING_OFFERS, CLEAR_LANDING_OFFERS} from '../actions/index.actions';

export default function landingOffersCount (state = '', action) {
  switch (action.type) {
  case SAVE_LANDING_OFFERS: {
    return action.payload;
  }
  case CLEAR_LANDING_OFFERS: {
    return '';
  }
  default: {
    return state;
  }
  }
}