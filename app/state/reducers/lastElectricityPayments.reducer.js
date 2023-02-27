import {LAST_ELECTRICITY_PAYMENTS_UPDATE, LAST_ELECTRICITY_PAYMENTS_BILL_AMOUNT, ALL_ELECTRICITY_PAYMENTS, ELECTRICITY_PAYMENTS_CLEAR} from '../actions/index.actions';
import {getFrequentPayments, updateBillAmount} from '../../utils/transformer.util';

const initialState =  {allTransactions: [], recentElectricityPayments: []};

export default function lastElectricityPayments (state = initialState, action) {
  switch (action.type) {
  case LAST_ELECTRICITY_PAYMENTS_UPDATE: {
    const allTransactions = [...state.allTransactions, action.payload];
    const recentElectricityPayments = getFrequentPayments(allTransactions, 'meterNo');
    return {allTransactions, recentElectricityPayments};
  }
  case LAST_ELECTRICITY_PAYMENTS_BILL_AMOUNT: {
    const allTransactions = updateBillAmount(state.allTransactions, action.payload, 'meterNo');
    const recentElectricityPayments = updateBillAmount(state.recentElectricityPayments, action.payload, 'meterNo');
    return {allTransactions, recentElectricityPayments};
  }
  case ALL_ELECTRICITY_PAYMENTS: {
    const recentElectricityPayments = getFrequentPayments(action.payload, 'meterNo');
    return {allTransactions: action.payload, recentElectricityPayments};
  }
  case ELECTRICITY_PAYMENTS_CLEAR: {
    return {...initialState};
  }
  default: {
    return state;
  }
  }
}
