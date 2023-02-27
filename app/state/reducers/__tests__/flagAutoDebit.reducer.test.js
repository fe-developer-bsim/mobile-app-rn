import flagAutoDebit from '../flagAutoDebit.reducer';
import {SAVE_FLAG_AUTODEBIT, CLEAR_FLAG_AUTODEBIT} from '../../actions/index.actions';

describe('Reducer: flagAutoDebit', () => {

  it('Should return default state by default', () => {
    expect(flagAutoDebit({}, '')).toEqual({});
  });

  it('Should set flagAutoDebit', () => {
    const action = {
      type: SAVE_FLAG_AUTODEBIT,
      payload: {
        isRegular: true,
        date: '18'
      }
    };
    const expectedResult = {
      isRegular: true,
      date: '18'
    };
    expect(flagAutoDebit({}, action)).toEqual(expectedResult);
  });

  it('Should reset flagAutoDebit', () => {
    const action = {
      type: CLEAR_FLAG_AUTODEBIT
    };
    const expectedResult = {};
    expect(flagAutoDebit({}, action)).toEqual(expectedResult);
  });

});
