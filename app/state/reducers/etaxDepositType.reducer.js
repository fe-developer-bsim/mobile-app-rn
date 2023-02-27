import {CLEAR_ETAX_DEPOSIT, SAVE_ETAX_DEPOSIT} from '../actions/index.actions';

export default function etaxDepositType (state = {}, action) {
  switch (action.type) {
  case SAVE_ETAX_DEPOSIT: {
    return action.payload;
  }
  case CLEAR_ETAX_DEPOSIT: {
    return {};
  }
  default:
    return state;
  }
}
