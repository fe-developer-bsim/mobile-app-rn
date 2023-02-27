import * as actions from '../actions/index.actions';

const initialState = {creditCardTransactions: []};

export default function creditCardHistoryReducer (state = initialState, action) {
  switch (action.type) {
  case actions.CC_HISTORY_UPDATE: {
    return {creditCardTransactions: action.payload};
  }
  case actions.CC_HISTORY_CLEAR: {
    return {...initialState};
  }
  default:
    return state;
  }
}
