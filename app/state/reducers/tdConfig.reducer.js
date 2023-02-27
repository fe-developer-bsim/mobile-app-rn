import {TD_CONFIG_UPDATE_CONVENTIONAL, TD_CONFIG_UPDATE_SHARIA, TD_CONFIG_CLEAR} from '../actions/index.actions';

export default function tdConfig (state = {}, action) {
  switch (action.type) {
  case TD_CONFIG_UPDATE_CONVENTIONAL: {
    return Object.assign({}, state, {'conventionalConfig': action.payload});
  }
  case TD_CONFIG_UPDATE_SHARIA: {
    return Object.assign({}, state, {'shariaConfig': action.payload});
  }
  case TD_CONFIG_CLEAR: {
    return {};
  }
  default: {
    return state;
  }
  }
}
