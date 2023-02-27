import configVersion from '../configVersion.reducer';
import {SAVE_CONFIG_CACHE, CLEAR_CONFIG_CACHE} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set configVersion config', () => {
    const action = {
      type: SAVE_CONFIG_CACHE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(configVersion([], action)).toEqual(expectedResult);
  });

  it('Should reset configVersion config', () => {
    const action = {
      type: CLEAR_CONFIG_CACHE
    };
    const expectedResult = '';
    expect(configVersion([], action)).toEqual(expectedResult);
  });

});
