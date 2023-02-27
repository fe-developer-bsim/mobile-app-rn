import * as actions from '../actions/index.actions';

const defaultState = false;

export default function hasFingerprintReducer (state = defaultState, action) {
  switch (action.type) {
  case actions.HAS_FINGERPRINT_UPDATE: {
    return action.payload;
  }
  default:
    return state;
  }
}
