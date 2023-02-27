import {SAVE_TOOGLE_REMITTANCE, DELETE_TOOGLE_REMITTANCE} from '../actions/index.actions';

export default function toogleRemittance (state = '', action) {
  switch (action.type) {
  case SAVE_TOOGLE_REMITTANCE: {
    return action.payload;
  }
  case DELETE_TOOGLE_REMITTANCE: {
    return '';
  }
  default: {
    return state;
  }
  }
}
