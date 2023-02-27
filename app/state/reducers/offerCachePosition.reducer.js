import {SAVE_CACHE_OFFERS, CLEAR_CACHE_OFFERS} from '../actions/index.actions';

export default function offersCachePosition (state = '', action) {
  switch (action.type) {
  case SAVE_CACHE_OFFERS: {
    return action.payload;
  }
  case CLEAR_CACHE_OFFERS: {
    return '';
  }
  default: {
    return state;
  }
  }
}
