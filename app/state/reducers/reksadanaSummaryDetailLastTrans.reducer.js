import {SAVE_REKSADANA_SUMMARY_DETAIL_LAST, CLEAR_REKSADANA_SUMMARY_DETAIL_LAST} from '../actions/index.actions';

export default function reksadanaReducer (state = [], action) {
  switch (action.type) {
  case SAVE_REKSADANA_SUMMARY_DETAIL_LAST: {
    return action.payload;
  }
  case CLEAR_REKSADANA_SUMMARY_DETAIL_LAST: {
    return [];
  }
  default:
    return state;
  }
}
