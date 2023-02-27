import {CHECK_CIF_BEFORE_LOGIN, DELETE_CHECK_CIF_BEFORE_LOGIN} from '../actions/index.actions';

export default function checkingCIFbeforeLogin (state = false, action) {
  switch (action.type) {
  case CHECK_CIF_BEFORE_LOGIN: {
    return true;
  }
  case DELETE_CHECK_CIF_BEFORE_LOGIN: {
    return false;
  }
  default: {
    return state;
  }
  }
}
