import {CONFIG_POPULATE_DATA, CONFIG_CLEAR} from '../actions/index.actions';

export default function configReducer (state = {'transactionTypeLKD': {
  'pay': '0',
  'cashOut': '1',
  'cashIn': '2',
  'payOffline': '3',
  'cashOutOffline': '4',
  'cashInOffline': '5'
}}, action) {
  switch (action.type) {
  case CONFIG_POPULATE_DATA:
  {
    return {...state, ...action.payload};
  }
  case CONFIG_CLEAR:
  {
    return {};
  }
  default:
  {
    return state;
  }
  }
}
