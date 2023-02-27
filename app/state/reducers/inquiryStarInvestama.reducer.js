import {SAVE_INQUIRY_STAR_INVESTAMA, CLEAR_INQUIRY_STAR_INVESTAMA} from '../actions/index.actions';

export default function inqStarInvestama (state = [], action) {
  switch (action.type) {
  case SAVE_INQUIRY_STAR_INVESTAMA: {
    return action.payload;
  }
  case CLEAR_INQUIRY_STAR_INVESTAMA: {
    return [];
  }
  default:
    return state;
  }
}
