import {LAST_FUND_TRANSACTION_UPDATE, ALL_PAYEES, FUND_TRANSACTION_CLEAR} from '../actions/index.actions';
import {getFrequentPayments} from '../../utils/transformer.util';

const initialState =  {allTransactions: [], recentTransactions: []};

export default function lastFundTransactions (state = initialState, action) {
  switch (action.type) {
  case LAST_FUND_TRANSACTION_UPDATE: {
    const allTransactions = [...state.allTransactions, action.payload];
    const recentTransactions = getFrequentPayments(allTransactions, 'accountNumber');
    return {allTransactions, recentTransactions};
  }
  case ALL_PAYEES: {
    const recentTransactions = getFrequentPayments(action.payload, 'accountNumber');
    return {allTransactions: action.payload, recentTransactions};
  }
  case FUND_TRANSACTION_CLEAR: {
    return {...initialState};
  }
  default: return state;
  }
}
