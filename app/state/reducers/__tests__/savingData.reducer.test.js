import savingData from '../savingData.reducer';
import {SAVE_SAVING_DATA, CLEAR_SAVING_DATA} from '../../actions/index.actions';

describe('Reducer: savingData', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_SAVING_DATA,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(savingData([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_SAVING_DATA
    };
    const expectedResult = [];
    expect(savingData([], action)).toEqual(expectedResult);
  });

});

