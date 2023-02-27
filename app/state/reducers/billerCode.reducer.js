import {SAVE_BILLERCODE, CLEAR_BILLERCODE} from '../actions/index.actions';

export default function billerCode (state = '', action) {
  switch (action.type) {
  case SAVE_BILLERCODE: {
    return action.payload;
  }
  case CLEAR_BILLERCODE: {
    return '';
  }
  default: {
    return state;
  }
  }
}
