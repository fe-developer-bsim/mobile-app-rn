import {SAVE_SIL_IDR_USD, CLEAR_SIL_IDR_USD} from '../actions/index.actions';

export default function silIdrUsd (state = '', action) {
  switch (action.type) {
  case SAVE_SIL_IDR_USD: {
    return action.payload;
  }
  case CLEAR_SIL_IDR_USD: {
    return '';
  }
  default:
    return state;
  }
}
