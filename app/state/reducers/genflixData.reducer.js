import {SET_GENFLIX_INIT, CLEAR_GENFLIX_DATA, SET_GENFLIX_INFO, SET_SUBSCRIPTION_DATA} from '../actions/index.actions';

const defaultState = {};
const genflixData = (state = defaultState, action) => {
  switch (action.type) {
  case SET_GENFLIX_INIT: {
    return {...state, initData: action.payload};    
  }
  case SET_GENFLIX_INFO: {
    return {...state, genflixCustomerInfo: action.payload};
  }
  case SET_SUBSCRIPTION_DATA: {
    return {...state, genflixSubscriptionInfo: action.payload};
  }
  case CLEAR_GENFLIX_DATA: {
    return defaultState;
  }
  default: {
    return state;
  }
  }
};

export default genflixData;
