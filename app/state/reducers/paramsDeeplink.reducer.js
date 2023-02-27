import {SAVE_PARAMS_LINK, CLEAR_PARAMS_LINK} from '../actions/index.actions';

export default function payees (state = [], action) {
  switch (action.type) {
  case SAVE_PARAMS_LINK: {
    const newPayees = action.payload;
    return [...newPayees];
  }
  case CLEAR_PARAMS_LINK: {
    return [];
  }
  default:
    return state;
  }
}