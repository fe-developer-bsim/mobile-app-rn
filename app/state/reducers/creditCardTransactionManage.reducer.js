import * as actions from '../actions/index.actions';

export default function creditCardTrxManageReducer (state = {}, action) {
  switch (action.type) {
  case actions.SAVE_CC_TRANSACTION_MANAGE: {
    return action.payload;
  }
  case actions.CLEAR_CC_TRANSACTION_MANAGE: {
    return {};
  }
  default:
    return state;
  }
}
