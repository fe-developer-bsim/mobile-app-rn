import {SAVE_SIMAS_TARA_DETAIL, CLEAR_SIMAS_TARA_DETAIL} from '../actions/index.actions';

export default function simasTaraDetail (state = {}, action) {
  switch (action.type) {
  case SAVE_SIMAS_TARA_DETAIL: {
    return action.payload;
  }
  case CLEAR_SIMAS_TARA_DETAIL: {
    return {};
  }
  default: {
    return state;
  }
  }
}