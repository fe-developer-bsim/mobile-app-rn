import {GET_MY_ORDER_DATA_LIST, CLEAR_MY_ORDER_DATA_LIST} from '../actions/index.actions';

const defaultState = [];
export default function promos (state = defaultState, action) {
  switch (action.type) {
  case GET_MY_ORDER_DATA_LIST: {
    return action.payload;
  }
  case CLEAR_MY_ORDER_DATA_LIST: {
    return defaultState;
  }
  default:
    return state;
  }
}
