import * as actions from '../actions/index.actions';
import result from 'lodash/result';

const defaultState = {
  isFaceRegistered: false,
  skipped: false
};

export default function faceReducer (state = defaultState, action) {
  switch (action.type) {
  case actions.IS_FACE_REGISTERED_UPDATE: {
    return {isFaceRegistered: result(action, 'payload.isFaceRegistered', false), skipped: result(action, 'payload.skipped', false)};
  }
  case actions.CLEAR_IS_FACE_REGISTERED: {
    return defaultState;
  }
  default:
    return state;
  }
}
