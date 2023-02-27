import {CLEAR_ACCOUNT_IB, SAVE_ACCOUNT_IB} from '../actions/index.actions';


export default function accounts (state = [], action) {
  switch (action.type) {
  case SAVE_ACCOUNT_IB: {
    const toggleIB = action.payload;
    return  {toggleIB};
  }
  case CLEAR_ACCOUNT_IB: {
    return  {};
  }
  default:
    return state;
  }
}
