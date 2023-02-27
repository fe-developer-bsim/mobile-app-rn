import {SAVE_IP_ADDRESS, CLEAR_IP_ADDRESS} from '../actions/index.actions';

export default function billerCode (state = ' ', action) {
  switch (action.type) {
  case SAVE_IP_ADDRESS: {
    return action.payload;
  }
  case CLEAR_IP_ADDRESS: {
    return '';
  }
  default: {
    return state;
  }
  }
}
