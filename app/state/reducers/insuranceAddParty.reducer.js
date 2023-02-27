import {ADD_PARTY_INSURANCE, CLEAR_PARTY_INSURANCE} from '../actions/index.actions';

export default function addParty (state = {}, action) {
  switch (action.type) {
  case ADD_PARTY_INSURANCE: {
    return action.payload;
  }
  case CLEAR_PARTY_INSURANCE: {
    return {};
  }
  default:
    return state;
  }
}