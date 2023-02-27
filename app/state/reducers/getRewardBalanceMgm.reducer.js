import {SAVE_REWARD_BALANCE, CLEAR_REWARD_BALANCE} from '../actions/index.actions';

export default function rewardBalanceMgm (state = {}, action) {
  switch (action.type) {
  case SAVE_REWARD_BALANCE: {
    return action.payload;
  }
  case CLEAR_REWARD_BALANCE: {
    return {};
  }
  default:
    return state;
  }
}
