import {SET_NETWORK_STATUS} from '../actions/index.actions';

const defaultState = {isConnected: true};
export default function networkStatus (state = defaultState, action) {
  switch (action.type) {
  case SET_NETWORK_STATUS: {
    return {isConnected: action.payload};
  }
  default: {
    return state;
  }
  }
}
