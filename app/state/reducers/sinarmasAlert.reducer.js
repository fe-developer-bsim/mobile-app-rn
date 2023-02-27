import {SINARMAS_ALERT_SHOW, SINARMAS_ALERT_HIDE, SET_DATA_SINARMAS_ALERT_REDUCER} from '../actions/index.actions';
import noop from 'lodash/noop';

const initialState = {
  image: 'CHECK',
  heading1: 'heading1',
  heading2: 'heading2',
  text: 'text',
  button1: 'button1',
  button2: 'button2',
  onButton1Press: noop,
  onButton2Press: noop,
  visible: false,
  closeOnTouchOutside: false,
  uriImage: ''
};
export default function paymentModal (state = initialState, action) {
  switch (action.type) {
  case SINARMAS_ALERT_SHOW:
    return {...action.payload, visible: true};
  case SINARMAS_ALERT_HIDE:
    return {...state, visible: false};
  case SET_DATA_SINARMAS_ALERT_REDUCER:
    return {...action.payload, visible: true};
  default:
    return state;
  }
}
