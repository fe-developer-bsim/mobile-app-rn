import {SAVE_PAYEE_STATUS_REMITTANCE, CLEAR_PAYEE_STATUS_REMITTANCE} from '../actions/index.actions';

export default function payeeStatusRemittanceReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_PAYEE_STATUS_REMITTANCE: {
    const payeeStatusRemittance = action.payload;    
    return payeeStatusRemittance;
  }
  case CLEAR_PAYEE_STATUS_REMITTANCE: {
    return {};
  }
  default:
    return state;
  }
}
