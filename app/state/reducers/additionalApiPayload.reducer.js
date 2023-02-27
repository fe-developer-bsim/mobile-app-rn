import {SET_ADDITIONAL_API_PAYLOAD_PARAMETER, CLEAR_ADDITIONAL_API_PAYLOAD_PARAMETER} from '../actions/index.actions';
import {deviceInfo} from '../../utils/device.util';

const defaultPayload = {
  ipassport: null,
  securityTypeCode: '11',
  language: 'en',
  deviceParam: deviceInfo.id,
  tokenClient: null,
  tokenServer: null,
  sessionCode: null,
  E2EE_RANDOM: '123456'
};

export default function additionalApiPayload (state = defaultPayload, action) {
  switch (action.type) {
  case SET_ADDITIONAL_API_PAYLOAD_PARAMETER: {
    return {...state, ...action.payload};
  }
  case CLEAR_ADDITIONAL_API_PAYLOAD_PARAMETER: {
    return {...defaultPayload};
  }
  default: { return state; }
  }
}
