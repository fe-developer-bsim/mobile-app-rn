import {SAVE_TOTAL_REWARD, CLEAR_TOTAL_REWARD} from '../actions/index.actions';

export default function totalRewardMgm (state = {}, action) {
  switch (action.type) {
  case SAVE_TOTAL_REWARD: {
    return action.payload;
  }
  case CLEAR_TOTAL_REWARD: {
    return {};
  }
  default:
    return state;
  }
}
