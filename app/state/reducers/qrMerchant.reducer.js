import {QR_MERCHANT_UPDATE, QR_MERCHANT_CLEAR} from '../actions/index.actions';

export default function userMerchant (state = {}, action) {
  switch (action.type) {
  case QR_MERCHANT_UPDATE: {
    const userMetaData = action.payload;
    return userMetaData;
  }
  case QR_MERCHANT_CLEAR: {
    return {};
  }
  default:
    return state;
  }
}
