import {SAVE_PARAMS_LINK_SAVING, CLEAR_PARAMS_LINK_SAVING} from '../actions/index.actions';

export default function paramsDeeplinkObject (state = {}, action) {
  switch (action.type) {
  case SAVE_PARAMS_LINK_SAVING: {
    return action.payload;
  }
  case CLEAR_PARAMS_LINK_SAVING: {
    return {};
  }
  default: {
    return state;
  }
  }
}
