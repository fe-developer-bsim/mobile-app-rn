import {LAST_POSTPAID_PAYMENTS_UPDATE, LAST_POSTPAID_PAYMENTS_UPDATE_BILL_AMOUNT, ALL_POSTPAID_PAYMENTS, POSTPAID_PAYMENTS_CLEAR} from '../actions/index.actions';
import {getFrequentPayments, updateBillAmount} from '../../utils/transformer.util';

const initialState =  {allTransactions: [], recentPostpaidPayments: []};

export default function lastPostpaidPayments (state = initialState, action) {
  switch (action.type) {
  case LAST_POSTPAID_PAYMENTS_UPDATE: {
    const allTransactions = [...state.allTransactions, action.payload];
    const recentPostpaidPayments = getFrequentPayments(allTransactions, 'mobileNo');
    return {allTransactions, recentPostpaidPayments};
  }
  case LAST_POSTPAID_PAYMENTS_UPDATE_BILL_AMOUNT: {
    const allTransactions = updateBillAmount(state.allTransactions, action.payload, 'mobileNo');
    const recentPostpaidPayments = updateBillAmount(state.recentPostpaidPayments, action.payload, 'mobileNo');
    return {allTransactions, recentPostpaidPayments};
  }
  case ALL_POSTPAID_PAYMENTS: {
    const recentPostpaidPayments = getFrequentPayments(action.payload, 'mobileNo');
    return {allTransactions: action.payload, recentPostpaidPayments};
  }
  case POSTPAID_PAYMENTS_CLEAR: {
    return {...initialState};
  }
  default: {
    return state;
  }
  }
}
