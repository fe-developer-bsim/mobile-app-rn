import {SET_DIRTY_MINI_STATEMENT} from '../actions/index.actions';


export default function dirtyMiniStatement (state = false, action) {
  switch (action.type) {
  case SET_DIRTY_MINI_STATEMENT: {
    return action.payload;
  }
  default:
    return state;
  }
}
