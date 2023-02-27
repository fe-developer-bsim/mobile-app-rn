import {SET_QR_GPN_ISSUER, CLEAR_QR_GPN_ISSUER} from '../actions/index.actions';

export default function qrGpnIssuer (state = {}, action) {
  switch (action.type) {
  case SET_QR_GPN_ISSUER: {
    const qrGpnData = action.payload;
    return qrGpnData;
  }
  case CLEAR_QR_GPN_ISSUER: {
    return {};
  }
  default:
    return state;
  }
}
