import {PAYEE_UPDATE_PAYEE_REMITTANCE_LIST, PAYEE_REMITTANCE_LIST_CLEAR} from '../actions/index.actions';

export default function payeesRemittance (state = [], action) {
  switch (action.type) {
  case PAYEE_UPDATE_PAYEE_REMITTANCE_LIST: {
    const newPayees = action.payload;
    return [...newPayees];
  }
  case PAYEE_REMITTANCE_LIST_CLEAR: {
    return [];
  }
  default:
    return state;
  }
}
