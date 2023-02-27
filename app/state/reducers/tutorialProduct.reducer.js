import {SAVE_TUTORIAL_PRODUCT, CLEAR_TUTORIAL_PRODUCT} from '../actions/index.actions';

export default function tutorialProduct (state = {}, action) {
  switch (action.type) {
  case SAVE_TUTORIAL_PRODUCT: {
    return action.payload;
  }
  case CLEAR_TUTORIAL_PRODUCT: {
    return {};
  }
  default: {
    return state;
  }
  }
}
