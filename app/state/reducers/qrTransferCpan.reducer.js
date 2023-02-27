import {SAVE_TRANSFER_CPAN, CLEAR_TRANSFER_CPAN} from '../actions/index.actions';

export default function referralCode (state = {}, action) {
  switch (action.type) {
  case SAVE_TRANSFER_CPAN: {
    return action.payload;
  }
  case CLEAR_TRANSFER_CPAN: {
    return {};
  }
  default:
    return state;
  }
}
