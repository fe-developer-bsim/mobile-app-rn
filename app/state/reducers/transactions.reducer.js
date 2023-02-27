import * as actions from '../actions/index.actions';

const initialState = {last10: [], lastMonth: [], last2Months: [], last3Months: [], today: [], selectDateRange: [], currentMonth: [],
  filters: {
    selectedFilter: {
      value: 'currentMonth', label: 'Current Month'
    },
  }
};

export default function transactionsReducer (state = initialState, action) {
  switch (action.type) {
  case actions.TRANSACTIONS_UPDATE_LAST_10: {
    return {...state, last10: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_LAST_MONTH: {
    return {...state, lastMonth: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_LAST_2_MONTHS: {
    return {...state, last2Months: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_LAST_3_MONTHS: {
    return {...state, last3Months: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_CURRENT_MONTH: {
    return {...state, currentMonth: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_TODAY: {
    return {...state, today: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_DATE_RANGE: {
    return {...state, selectDateRange: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_FILTERS: {
    return {...state, filters: {...state.filters, ...action.payload}};
  }
  case actions.TRANSACTIONS_CLEAR: {
    return {...initialState,  filters: {...state.filters}};
  }
  case actions.TRANSACTIONS_CLEAN_CLEAR: {
    return {...initialState};
  }
  default:
    return state;
  }
}
