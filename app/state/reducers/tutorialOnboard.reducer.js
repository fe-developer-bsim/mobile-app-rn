import {SAVE_TUTORIAL_ONBOARD, CLEAR_TUTORIAL_ONBOARD} from '../actions/index.actions';

export default function tutorialOnboard (state = {}, action) {
  switch (action.type) {
  case SAVE_TUTORIAL_ONBOARD: {
    return action.payload;
  }
  case CLEAR_TUTORIAL_ONBOARD: {
    return {};
  }
  default: {
    return state;
  }
  }
}
