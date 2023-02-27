import {SAVE_RESULT_STOCK_ALFA, CLEAR_RESULT_STOCK_ALFA} from '../actions/index.actions';

export default function saveResultStock (state = [], action) {
  switch (action.type) {
  case SAVE_RESULT_STOCK_ALFA: {
    return action.payload;
  }
  case CLEAR_RESULT_STOCK_ALFA: {
    return [];
  }
  default: {
    return state;
  }
  }
}