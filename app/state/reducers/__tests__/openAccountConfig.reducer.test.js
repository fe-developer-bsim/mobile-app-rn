import openAccountConfig from '../openAccountConfig.reducer';
import {OPEN_ACCOUNT_CONFIG_UPDATE, OPEN_ACCOUNT_CONFIG_CLEAR} from '../../actions/index.actions';

describe('Reducer: openAccountConfig', () => {

  it('Should return default state by default', () => {
    expect(openAccountConfig([], '')).toEqual([]);
  });

  it('Should set openAccountConfig', () => {
    const action = {
      type: OPEN_ACCOUNT_CONFIG_UPDATE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(openAccountConfig([], action)).toEqual(expectedResult);
  });

  it('Should reset openAccountConfig', () => {
    const action = {
      type: OPEN_ACCOUNT_CONFIG_CLEAR
    };
    const expectedResult = {};
    expect(openAccountConfig([], action)).toEqual(expectedResult);
  });

});
