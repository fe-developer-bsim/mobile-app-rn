import configEmoney from '../configEmoney.reducer';
import {SAVE_CONFIG_EMONEY} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set configVersion config', () => {
    const action = {
      type: SAVE_CONFIG_EMONEY,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(configEmoney([], action)).toEqual(expectedResult);
  });



});
