import {LIMIT_SAVE, LIMIT_CLEAR} from '../actions/index.actions';

export default function setLimitStorage (state = {}, action) {
  switch (action.type) {
  case LIMIT_SAVE:
  {
    return {...state, ...action.payload};
  }
  case LIMIT_CLEAR:
  {
    return {};
  }
  default:
  {
    return state;
  }
  }
}
