import {PAYEE_UPDATE_PAYEE_PROXY_ADDRESS_LIST, PAYEE_PROXY_ADDRESS_LIST_CLEAR} from '../actions/index.actions';

export default function payeeProxyAddress (state = [], action) {
  switch (action.type) {
  case PAYEE_UPDATE_PAYEE_PROXY_ADDRESS_LIST: {
    const newPayees = action.payload;
    return [...newPayees];
  }
  case PAYEE_PROXY_ADDRESS_LIST_CLEAR: {
    return [];
  }
  default:
    return state;
  }
}
