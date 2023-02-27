import {SAVE_LOADING_STATE_NEARBY, SAVE_LOADING_STATE_ALL, CLEAR_LOADING_STATE} from '../actions/index.actions';

export default function qrDiscountReducer (state = [], action) {
  switch (action.type) {
  case SAVE_LOADING_STATE_NEARBY: {
    return {...state, isLoadingQRListNearby: action.payload};
  }
  case SAVE_LOADING_STATE_ALL: {
    return {...state, isLoadingQRListAll: action.payload};
  }
  case CLEAR_LOADING_STATE: {
    return {};
  }
  default:
    return state;
  }
}
