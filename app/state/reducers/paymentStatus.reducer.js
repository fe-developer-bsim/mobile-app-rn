import {UPDATE_PAYMENT_STATUS, CLEAR_PAYMENT_STATUS} from '../actions/index.actions';

const initialState = {};

export default function paymentModal (state = initialState, action) {
  switch (action.type) {
  case UPDATE_PAYMENT_STATUS:
    return {...action.payload};
  case CLEAR_PAYMENT_STATUS:
    return {...state};
  default:
    return state;
  }
}
