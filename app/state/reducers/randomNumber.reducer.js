import {GENERATE_RANDOM_NUMBER, CLEAR_GENERATE_RANDOM_NUMBER} from '../actions/index.actions';

export default function generaterandomNumber (state = '', action) {
  switch (action.type) {
  case GENERATE_RANDOM_NUMBER: {
    return action.payload;
  }
  case CLEAR_GENERATE_RANDOM_NUMBER: {
    return '';
  }
  default: {
    return state;
  }
  }
}