import {SET_IS_LOADING, SET_NOT_LOADING} from '../actions/index.actions';

export default function isLoading (state = false, action) {
  switch (action.type) {
  case SET_IS_LOADING: {
    return true;
  }
  case SET_NOT_LOADING: {
    return false;
  }
  default: {
    return state;
  }
  }
}
