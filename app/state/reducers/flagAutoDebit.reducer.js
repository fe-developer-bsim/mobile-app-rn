import {SAVE_FLAG_AUTODEBIT, CLEAR_FLAG_AUTODEBIT} from '../actions/index.actions';

export default function referralCode (state = {}, action) {
  switch (action.type) {
  case SAVE_FLAG_AUTODEBIT: {
    return {...state, ...action.payload};
  }
  case CLEAR_FLAG_AUTODEBIT: {
    return {};
  }
  default:
    return state;
  }
}
