import {SAVE_LIST_PLANE1, CLEAR_LIST_PLANE1} from '../actions/index.actions';

export default function flightDataDetail1 (state = {}, action) {
  switch (action.type) {
  case SAVE_LIST_PLANE1: {
    return action.payload;
  }
  case CLEAR_LIST_PLANE1: {
    return {};
  }
  default: { 
    return state;
  } 
    
  }
}
