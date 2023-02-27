import {SAVE_FILTER_CALENDAR, CLEAR_FILTER_CALENDAR} from '../actions/index.actions';

export default function filterCalendar (state = {}, action) {
  switch (action.type) {
  case SAVE_FILTER_CALENDAR: {
    return action.payload;
  }
  case CLEAR_FILTER_CALENDAR: {
    return {};
  }
  default:
    return state;
  }
}
