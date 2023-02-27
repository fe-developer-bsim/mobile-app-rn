import {SET_APP_TIMEOUT_REDUCER, CLEAR_APP_TIMEOUT_REDUCER} from '../actions/index.actions';

export default function timeoutReducer (state = 300, action) {
  switch (action.type) {
  case SET_APP_TIMEOUT_REDUCER: {
    return action.payload;
  }
  case CLEAR_APP_TIMEOUT_REDUCER: {
    return 300;
  }
  default: {
    return state;
  }
  }
}
