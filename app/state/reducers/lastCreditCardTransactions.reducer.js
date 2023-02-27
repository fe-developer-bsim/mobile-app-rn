import {LAST_CREDIT_CARD_TRANSACTION_UPDATE, ALL_CREDIT_CARD_TRANSACTIONS, CREDIT_CARD_TRANSACTIONS_CLEAR} from '../actions/index.actions';
import {getFrequentPayments} from '../../utils/transformer.util';

const initialState =  {allTransactions: [], recentTransactions: []};

export default function lastCreditCardTransactions (state = initialState, action) {
  switch (action.type) {
  case LAST_CREDIT_CARD_TRANSACTION_UPDATE: {
    const allTransactions = [...state.allTransactions, action.payload];
    const recentTransactions = getFrequentPayments(allTransactions, 'accNo');
    return {allTransactions, recentTransactions};
  }
  case ALL_CREDIT_CARD_TRANSACTIONS: {
    const recentTransactions = getFrequentPayments(action.payload, 'accNo');
    return {allTransactions: action.payload, recentTransactions};
  }
  case CREDIT_CARD_TRANSACTIONS_CLEAR: {
    return {...initialState};
  }
  default: return state;
  }
}
