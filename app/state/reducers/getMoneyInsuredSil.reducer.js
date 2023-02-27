import {SAVE_MONEY_INSURED_SIL, CLEAR_MONEY_INSURED_SIL} from '../actions/index.actions';

export default function getMoneyInsuredSil (state = [], action) {
  switch (action.type) {
  case SAVE_MONEY_INSURED_SIL: {
    return action.payload;
  }
  case CLEAR_MONEY_INSURED_SIL: {
    return [];
  }
  default:
    return state;
  }
}

