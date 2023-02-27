import healthQuestion from '../healthQuestion.reducer';
import {SAVE_HEALTH_QUESTION, CLEAR_HEALTH_QUESTION} from '../../actions/index.actions';

describe('Reducer: healthQuestion', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(healthQuestion(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_HEALTH_QUESTION};
    expect(healthQuestion(previousState, action)).toEqual(initialState);
  });
  it('Should update healthQuestion', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_HEALTH_QUESTION, payload: {test: 'wa'}};
    expect(healthQuestion(previousState, action)).toEqual(nextState);
  });
});
