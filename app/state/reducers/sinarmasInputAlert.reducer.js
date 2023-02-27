import {SINARMAS_INPUT_ALERT_SHOW, SINARMAS_INPUT_ALERT_HIDE} from '../actions/index.actions';
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
  case SINARMAS_INPUT_ALERT_SHOW:
    return {...action.payload, visible: true};
  case SINARMAS_INPUT_ALERT_HIDE:
    return {...state, visible: false};
  default:
    return state;
  }
}
