import * as actions from '../actions/index.actions';

const initialState = {last10: [], lastMonth: [], last2Months: [], last3Months: [],
  filters: {
    selectedRange: {
      value: 'lastMonth', label: 'Last Month'
    }
  }
};

export default function transactionsEmoneyReducer (state = initialState, action) {
  switch (action.type) {
  case actions.TRANSACTIONS_EMONEY_UPDATE_LAST_10: {
    return {...state, last10: action.payload};
  }
  case actions.TRANSACTIONS_EMONEY_UPDATE_LAST_MONTH: {
    return {...state, lastMonth: action.payload};
  }
  case actions.TRANSACTIONS_EMONEY_UPDATE_LAST_2_MONTHS: {
    return {...state, last2Months: action.payload};
  }
  case actions.TRANSACTIONS_EMONEY_UPDATE_LAST_3_MONTHS: {
    return {...state, last3Months: action.payload};
  }
  case actions.TRANSACTIONS_EMONEY_UPDATE_FILTERS: {
    return {...state, filters: {...state.filters, ...action.payload}};
  }
  case actions.TRANSACTIONS_EMONEY_CLEAR: {
    return {...initialState,  filters: {...state.filters}};
  }
  case actions.TRANSACTIONS_EMONEY_CLEAN_CLEAR: {
    return {...initialState};
  }
  default:
    return state;
  }
}
