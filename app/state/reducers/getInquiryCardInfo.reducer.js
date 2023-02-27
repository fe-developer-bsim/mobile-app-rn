import {SAVE_INQUIRY_CARD_INFO, CLEAR_INQUIRY_CARD_INFO} from '../actions/index.actions';

export default function getInquiryCardInfo (state = {}, action) {
  switch (action.type) {
  case SAVE_INQUIRY_CARD_INFO: {
    return action.payload;
  }
  case CLEAR_INQUIRY_CARD_INFO: {
    return {};
  }
  default: {
    return state;
  }
  }
}