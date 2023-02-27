import silRiskQuestion from '../silRiskQuestion.reducer';
import {SAVE_RISK_QUESTION_SIL, CLEAR_RISK_QUESTION_SIL} from '../../actions/index.actions';

describe('Reducer: silRiskQuestion', () => {

  it('Should return default state by default', () => {
    expect(silRiskQuestion([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_RISK_QUESTION_SIL,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(silRiskQuestion([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_RISK_QUESTION_SIL
    };
    const expectedResult = '';
    expect(silRiskQuestion([], action)).toEqual(expectedResult);
  });

});
