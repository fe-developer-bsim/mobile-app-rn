import * as actions from '../actions/index.actions';

// const initialState = {today: []};

export default function claimRewardMgm (state = {}, action) {
  switch (action.type) {
  case actions.TRANSACTIONS_UPDATE_TODAY_REWARD: {
    return action.payload;
    // return {...state, today: action.payload};
  }
  case actions.TRANSACTIONS_CLEAN_CLEAR_TODAY_MGM: {
    return {};
  }
  default:
    return state;
  }
}
