import autoDebitHistory from '../autoDebitHistory.reducer';
import {SAVE_DATA_AUTODEBIT_HISTORY, CLEAR_DATA_AUTODEBIT_HISTORY} from '../../actions/index.actions';

describe('Reducer: autoDebitHistory', () => {

  it('Should return default state by default', () => {
    expect(autoDebitHistory([], '')).toEqual([]);
  });

  it('Should set autoDebitHistory', () => {
    const action = {
      type: SAVE_DATA_AUTODEBIT_HISTORY,
      payload: [
        {test1: 'data1'},
        {test2: 'data2'}
      ]
    };
    const expectedResult = [
      {test1: 'data1'},
      {test2: 'data2'}
    ];
    expect(autoDebitHistory([], action)).toEqual(expectedResult);
  });

  it('Should reset autoDebitHistory', () => {
    const action = {
      type: CLEAR_DATA_AUTODEBIT_HISTORY
    };
    const expectedResult = [];
    expect(autoDebitHistory([], action)).toEqual(expectedResult);
  });

});
