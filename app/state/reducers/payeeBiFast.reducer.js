import {SAVE_PAYEE_BIFAST, CLEAR_PAYEE_BIFAST} from '../actions/index.actions';

export default function payeeBiFast (state = {}, action) {
  switch (action.type) {
  case SAVE_PAYEE_BIFAST: {
    return action.payload;
  }
  case CLEAR_PAYEE_BIFAST: {
    return {};
  }
  default: {
    return state;
  }
  }
}
