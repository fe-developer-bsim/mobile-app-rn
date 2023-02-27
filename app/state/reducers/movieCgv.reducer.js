import {SAVE_MOVIE_CGV, CLEAR_MOVIE_CGV} from '../actions/index.actions';

export default function referralCode (state = {}, action) {
  switch (action.type) {
  case SAVE_MOVIE_CGV: {
    return action.payload;
  }
  case CLEAR_MOVIE_CGV: {
    return [];
  }
  default:
    return state;
  }
}
