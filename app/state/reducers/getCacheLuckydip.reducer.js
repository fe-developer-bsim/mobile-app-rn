import {SAVE_TICKET_LD_CACHE, CLEAR_TICKET_LD_CACHE} from '../actions/index.actions';

export default function luckyDipTicket (state = {}, action) {
  switch (action.type) {
  case SAVE_TICKET_LD_CACHE: {
    return action.payload;
  }
  case CLEAR_TICKET_LD_CACHE: {
    return {};
  }
  default:
    return state;
  }
}
