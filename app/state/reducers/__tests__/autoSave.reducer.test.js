import savingData from '../autoSave.reducer';
import {SAVE_AUTO_SAVE, CLEAR_AUTO_SAVE} from '../../actions/index.actions';

describe('Reducer: savingData', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_AUTO_SAVE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(savingData([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_AUTO_SAVE
    };
    const expectedResult = {};
    expect(savingData([], action)).toEqual(expectedResult);
  });

});