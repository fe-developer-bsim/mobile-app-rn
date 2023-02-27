import {SET_LANGUAGE} from '../actions/index.actions';

export default function language (state = {id: 'id'}, action) {
  switch (action.type) {
  case SET_LANGUAGE: {
    return {id: action.payload};
  }
  default:
    return state;
  }
}
