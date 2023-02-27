import * as actions from '../actions/index.actions';

const initialState = {last7days: [], today: [], last30days: [], thisMonth: [], custom: [],
};

export default function referralListMgmReducer (state = initialState, action) {
  switch (action.type) {
  case actions.TRANSACTIONS_UPDATE_LAST_7_DAYS: {
    return {...state, last7days: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_TODAY_REFERRAL: {
    return {...state, today: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_LAST_30_DAYS: {
    return {...state, last30days: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_THIS_MONTHS: {
    return {...state, thisMonth: action.payload};
  }
  case actions.TRANSACTIONS_UPDATE_CUSTOM: {
    return {...state, custom: action.payload};
  }
  case actions.TRANSACTIONS_CLEAN_CLEAR_MGM: {
    return {...initialState};
  }
  default:
    return state;
  }
}
