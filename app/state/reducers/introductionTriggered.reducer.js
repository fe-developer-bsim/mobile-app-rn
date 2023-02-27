import {TRIGGER_INTRODUCTION, CLEAR_TRIGGER_INTRODUCTION} from '../actions/index.actions';

export default function referralCode (state = false, action) {
  switch (action.type) {
  case TRIGGER_INTRODUCTION: {
    return action.payload;
  }
  case CLEAR_TRIGGER_INTRODUCTION: {
    return false;
  }
  default: {
    return state;
  }
  }
}
