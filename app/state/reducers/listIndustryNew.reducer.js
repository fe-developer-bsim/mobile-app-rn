import {SAVE_SIMPLIFIED_LIST_INDUSTRY_NEW, CLEAR_SIMPLIFIED_LIST_INDUSTRY_NEW} from '../actions/index.actions';

export default function listIndustryNew (state = [], action) {
  switch (action.type) {
  case SAVE_SIMPLIFIED_LIST_INDUSTRY_NEW: {
    const listIndustryNew = action.payload;
    return [...listIndustryNew];
  }
  case CLEAR_SIMPLIFIED_LIST_INDUSTRY_NEW: {
    return [];
  }
  default:
    return state;
  }
}