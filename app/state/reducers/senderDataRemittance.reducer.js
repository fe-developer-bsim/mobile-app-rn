import {SAVE_SENDER_DATA_REMITTANCE, CLEAR_SENDER_DATA_REMITTANCE} from '../actions/index.actions';

export default function senderDataRemittanceReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_SENDER_DATA_REMITTANCE: {
    return action.payload;
  }
  case CLEAR_SENDER_DATA_REMITTANCE: {
    return {};
  }
  default:
    return state;
  }
}
