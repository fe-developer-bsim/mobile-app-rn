import * as actions from '../actions/index.actions';

const defaultState = false;

export default function fingerprintReducer (state = defaultState, action) {
  switch (action.type) {
  case actions.IS_USING_FINGERPRINT_UPDATE: {
    return action.payload;
  }
  case actions.CLEAR_IS_USING_FINGERPRINT: {
    return defaultState;
  }
  default:
    return state;
  }
}
