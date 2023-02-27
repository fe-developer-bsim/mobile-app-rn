import {SAVE_PGO_VA_STATUS, CLEAR_PGO_VA_STATUS} from '../actions/index.actions';

export default function pgoVa (state = '', action) {
  switch (action.type) {
  case SAVE_PGO_VA_STATUS: {
    return action.payload;
  }
  case CLEAR_PGO_VA_STATUS: {
    return '';
  }
  default: {
    return state;
  }
  }
}
