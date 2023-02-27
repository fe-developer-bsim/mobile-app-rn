import {SAVE_PAYEE_STATUS_PROXY_ADDRESS, CLEAR_PAYEE_STATUS_PROXY_ADDRESS} from '../actions/index.actions';

export default function payeeStatusProxyAddressReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_PAYEE_STATUS_PROXY_ADDRESS: {
    const payeeStatusProxyAddress = action.payload;    
    return payeeStatusProxyAddress;
  }
  case CLEAR_PAYEE_STATUS_PROXY_ADDRESS: {
    return {};
  }
  default:
    return state;
  }
}
