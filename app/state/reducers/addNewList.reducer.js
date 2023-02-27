import {SAVE_NEW_PARTICIPANTS, CLEAR_NEW_PARTICIPANTS} from '../actions/index.actions';

export default function saveNewParticipants (state = '', action) {
  switch (action.type) {
  case SAVE_NEW_PARTICIPANTS: {
    return action.payload;
  }
  case CLEAR_NEW_PARTICIPANTS: {
    return '';
  }
  default: {
    return state;
  }
  }
}
