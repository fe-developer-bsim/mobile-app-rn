import SetDefaultAddress from '../SetDefaultAddress.reducer';
import {SAVE_DEFAULT_ADDRESS, CLEAR_DEFAULT_ADDRESS} from '../../actions/index.actions';

describe('Reducer: SetDefaultAddress', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_DEFAULT_ADDRESS,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(SetDefaultAddress([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_DEFAULT_ADDRESS
    };
    const expectedResult = {};
    expect(SetDefaultAddress([], action)).toEqual(expectedResult);
  });

});

