import {PAYEE_UPDATE_PAYEE_LIST, PAYEE_LIST_CLEAR} from '../actions/index.actions';

export default function payees (state = [], action) {
  switch (action.type) {
  case PAYEE_UPDATE_PAYEE_LIST: {
    const newPayees = action.payload;
    return [...newPayees];
  }
  case PAYEE_LIST_CLEAR: {
    return [];
  }
  default:
    return state;
  }
}
