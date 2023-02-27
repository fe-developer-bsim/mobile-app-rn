import newSourceofFund from '../newSourceofFund.reducer';
import {SAVE_NEW_SOF, CLEAR_NEW_SOF} from '../../actions/index.actions';

describe('Reducer: newSourceofFund', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_NEW_SOF,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(newSourceofFund([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_NEW_SOF
    };
    const expectedResult = {};
    expect(newSourceofFund([], action)).toEqual(expectedResult);
  });

});

