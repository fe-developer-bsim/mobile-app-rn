import {SAVE_RISK_QUESTION_SIL, CLEAR_RISK_QUESTION_SIL} from '../actions/index.actions';

export default function silRiskQuestionData (state = '', action) {
  switch (action.type) {
  case SAVE_RISK_QUESTION_SIL: {
    return action.payload;
  }
  case CLEAR_RISK_QUESTION_SIL: {
    return '';
  }
  default:
    return state;
  }
}
