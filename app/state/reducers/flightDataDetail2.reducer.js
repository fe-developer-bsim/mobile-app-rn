import {SAVE_LIST_PLANE2, CLEAR_LIST_PLANE2} from '../actions/index.actions';

export default function flightDataDetail2 (state = {}, action) {
  switch (action.type) {
  case SAVE_LIST_PLANE2: {
    return action.payload;
  }
  case CLEAR_LIST_PLANE2: {
    return {};
  }
  default: { 
    return state;
  } 
    
  }
}
