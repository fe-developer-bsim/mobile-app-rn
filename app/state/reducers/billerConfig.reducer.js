import {BILLER_CONFIG_UPDATE, BILLER_CONFIG_CLEAR} from '../actions/index.actions';

export default function accounts (state = [], action) {
  switch (action.type) {
  case BILLER_CONFIG_UPDATE: {
    return action.payload;
  }
  case BILLER_CONFIG_CLEAR: {
    return [];
  }
  default: {
    return state;
  }
  }
}
