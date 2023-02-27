import {SAVE_LIST_CONFIG_EFORM} from '../actions/index.actions';

export default function configEForm (state = {}, action) {
  switch (action.type) {
  case SAVE_LIST_CONFIG_EFORM: {
    return action.payload;
  }
  default:
    return state;
  }
}
