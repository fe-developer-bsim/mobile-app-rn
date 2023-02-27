import {SAVE_TOKEN_REGISTER, CLEAR_TOKEN_REGISTER} from '../actions/index.actions';

export default function tokenRegister (state = {}, action) {
  switch (action.type) {
  case SAVE_TOKEN_REGISTER: {
    return action.payload;
  }
  case CLEAR_TOKEN_REGISTER: {
    return {};
  }
  default: {
    return state;
  }
  }
}