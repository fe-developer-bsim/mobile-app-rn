import {LAST_RECHARGES_UPDATE, ALL_RECHARGES, RECHARGES_CLEAR} from '../actions/index.actions';
import {getFrequentPayments} from '../../utils/transformer.util';

const initialState =  {allRecharges: [], frequentRecharges: []};

export default function lastRecharges (state = initialState, action) {
  switch (action.type) {
  case LAST_RECHARGES_UPDATE: {
    const allRecharges = [...state.allRecharges, action.payload];
    const frequentRecharges = getFrequentPayments(allRecharges, 'subscriberNoInput');
    return {allRecharges, frequentRecharges};
  }
  case ALL_RECHARGES: {
    const frequentRecharges = getFrequentPayments(action.payload, 'subscriberNoInput');
    return {allRecharges: action.payload, frequentRecharges};
  }
  case RECHARGES_CLEAR: {
    return {...initialState};
  }
  default: {
    return state;
  }
  }
}
