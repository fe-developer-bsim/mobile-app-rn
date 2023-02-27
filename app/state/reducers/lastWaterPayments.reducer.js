import {LAST_WATER_PAYMENTS_UPDATE, LAST_WATER_PAYMENTS_BILL_AMOUNT, ALL_WATER_PAYMENTS, WATER_PAYMENTS_CLEAR} from '../actions/index.actions';
import {getFrequentPayments, updateBillAmount} from '../../utils/transformer.util';

const initialState =  {allWaterPayments: [], recentWaterPayments: []};

export default function lastWaterPayments (state = initialState, action) {
  switch (action.type) {
  case LAST_WATER_PAYMENTS_UPDATE: {
    const allWaterPayments = [...state.allWaterPayments, action.payload];
    const recentWaterPayments = getFrequentPayments(allWaterPayments, 'consumerNo');
    return {allWaterPayments, recentWaterPayments};
  }
  case LAST_WATER_PAYMENTS_BILL_AMOUNT: {
    const allWaterPayments = updateBillAmount(state.allWaterPayments, action.payload, 'consumerNo');
    const recentWaterPayments = updateBillAmount(state.recentWaterPayments, action.payload, 'consumerNo');
    return {allWaterPayments, recentWaterPayments};
  }
  case ALL_WATER_PAYMENTS: {
    const recentWaterPayments = getFrequentPayments(action.payload, 'consumerNo');
    return {allWaterPayments: action.payload, recentWaterPayments};
  }
  case WATER_PAYMENTS_CLEAR: {
    return {...initialState};
  }
  default: {
    return state;
  }
  }
}
