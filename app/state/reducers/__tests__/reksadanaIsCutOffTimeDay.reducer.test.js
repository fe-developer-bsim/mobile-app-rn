import reksadanaIsCutOffTimeDay from '../reksadanaIsCutOffTimeDay.reducer';
import {SAVE_IS_CUT_OFF_TIME_DAY, CLEAR_IS_CUT_OFF_TIME_DAY} from '../../actions/index.actions';

describe('Reducer: reksadanaIsCutOffTimeDay', () => {
  it('Should return default state by default', () => {
    const initialState =  {};
    expect(reksadanaIsCutOffTimeDay(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  {};
    const previousState = {
      test: 'wa'
    };
    const action = {type: CLEAR_IS_CUT_OFF_TIME_DAY};
    expect(reksadanaIsCutOffTimeDay(previousState, action)).toEqual(initialState);
  });
  it('Should update reksadanaIsCutOffTimeDay', () => {
    const previousState = {};
    const nextState = {
      test: 'wa'
    };
    const action = {type: SAVE_IS_CUT_OFF_TIME_DAY, payload: {test: 'wa'}};
    expect(reksadanaIsCutOffTimeDay(previousState, action)).toEqual(nextState);
  });
});
