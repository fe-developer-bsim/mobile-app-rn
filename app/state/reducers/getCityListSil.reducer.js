import {SAVE_CITY_LIST_SIL, CLEAR_CITY_LIST_SIL} from '../actions/index.actions';

export default function cityListSilReducer (state = [], action) {
  switch (action.type) {
  case SAVE_CITY_LIST_SIL: {
    return action.payload;
  }
  case CLEAR_CITY_LIST_SIL: {
    return [];
  }
  default:
    return state;
  }
}
