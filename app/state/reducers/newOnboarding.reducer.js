import {SAVE_NEW_ONBOARDING, CLEAR_NEW_ONBOARDING} from '../actions/index.actions';

export default function newOnboarding (state = '', action) {
  switch (action.type) {
  case SAVE_NEW_ONBOARDING: {
    return action.payload;
  }
  case CLEAR_NEW_ONBOARDING: {
    return '';
  }
  default: {
    return state;
  }
  }
}
