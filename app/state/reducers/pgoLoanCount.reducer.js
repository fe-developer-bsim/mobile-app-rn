import {SAVE_OFFERS_COUNT, CLEAR_OFFERS_COUNT} from '../actions/index.actions';

export default function pgoLoanCount (state = '', action) {
  switch (action.type) {
  case SAVE_OFFERS_COUNT: {
    return action.payload;
  }
  case CLEAR_OFFERS_COUNT: {
    return '';
  }
  default: {
    return state;
  }
  }
}