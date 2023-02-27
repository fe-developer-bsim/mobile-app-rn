import savingData from '../getMMQData.reducer';
import {SAVE_MMQ_DATA, CLEAR_MMQ_DATA} from '../../actions/index.actions';

describe('Reducer: savingData', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_MMQ_DATA,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(savingData([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_MMQ_DATA
    };
    const expectedResult = undefined;
    expect(savingData([], action)).toEqual(expectedResult);
  });

});

