import {PRIORITY_CONFIG_POPULATE_DATA, PRIORITY_CONFIG_CLEAR} from '../actions/index.actions';

export default function configReducer (state = {}, action) {
  switch (action.type) {
  case PRIORITY_CONFIG_POPULATE_DATA:
  {
    return {...state, ...action.payload};
  }
  case PRIORITY_CONFIG_CLEAR:
  {
    return {};
  }
  default:
  {
    return state;
  }
  }
}
