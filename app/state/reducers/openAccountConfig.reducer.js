import {OPEN_ACCOUNT_CONFIG_UPDATE, OPEN_ACCOUNT_CONFIG_CLEAR} from '../actions/index.actions';

export default function tdConfig (state = {}, action) {
  switch (action.type) {
  case OPEN_ACCOUNT_CONFIG_UPDATE: {
    return {...action.payload};
  }
  case OPEN_ACCOUNT_CONFIG_CLEAR: {
    return {};
  }
  default: {
    return state;
  }
  }
}
