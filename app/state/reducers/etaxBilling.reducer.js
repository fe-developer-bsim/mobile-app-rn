import {CLEAR_ETAX_BILLING, SAVE_ETAX_BILLING} from '../actions/index.actions';

export default function etaxBillingReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_ETAX_BILLING: {
    return action.payload;
  }
  case CLEAR_ETAX_BILLING: {
    return {};
  }
  default:
    return state;
  }
}
