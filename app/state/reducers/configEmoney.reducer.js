import {SAVE_CONFIG_EMONEY} from '../actions/index.actions';

export default function configEmoney (state = {}, action) {
  switch (action.type) {
  case SAVE_CONFIG_EMONEY: {
    return action.payload;
  }
  default:
    return state;
  }
}
