import * as actions from '../actions/index.actions';

const defaultState = false;

export default function faceRecogReducer (state = defaultState, action) {
  switch (action.type) {
  case actions.IS_USING_FACE_RECOG_UPDATE: {
    return action.payload;
  }
  case actions.CLEAR_USING_FACE_RECOG: {
    return defaultState;
  }
  default:
    return state;
  }
}
