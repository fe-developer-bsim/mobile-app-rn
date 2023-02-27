import {PAYMENT_MODAL_SHOW, PAYMENT_MODAL_HIDE} from '../actions/index.actions';

const initialState = {
  type: 'LOADING',
  heading: 'heading',
  subheading: 'subheading',
  transactionId: 'transactionId',
  timestamp: 'timestamp',
  resultDisplay: [],
  qrStatus: {},
  errorText: '',
  logout: false,
  transferTime: '',
  scheduledTime: '',
  
};
export default function paymentModal (state = initialState, action) {
  switch (action.type) {
  case PAYMENT_MODAL_SHOW:
    return {...action.payload};
  case PAYMENT_MODAL_HIDE:
    return {...state};
  default:
    return state;
  }
}
