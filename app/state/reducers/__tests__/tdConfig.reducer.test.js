import tdConfig from '../tdConfig.reducer';
import {TD_CONFIG_UPDATE_CONVENTIONAL, TD_CONFIG_UPDATE_SHARIA, TD_CONFIG_CLEAR} from '../../actions/index.actions';

describe('Reducer: tdConfig', () => {

  it('Should return default state by default', () => {
    expect(tdConfig([], {})).toEqual([]);
  });

  it('Should set TD config for conventional account', () => {
    const action = {
      type: TD_CONFIG_UPDATE_CONVENTIONAL,
      payload: {test: 123}
    };
    const expectedResult = {'conventionalConfig': {test: 123}};
    expect(tdConfig([], action)).toEqual(expectedResult);
  });

  it('Should set TD config for conventional account', () => {
    const action = {
      type: TD_CONFIG_UPDATE_SHARIA,
      payload: {test: 123}
    };
    const expectedResult = {'shariaConfig': {test: 123}};
    expect(tdConfig([], action)).toEqual(expectedResult);
  });

  it('Should clear TD config', () => {
    const action = {
      type: TD_CONFIG_CLEAR,
      payload: {}
    };
    const expectedResult = {};
    expect(tdConfig([], action)).toEqual(expectedResult);
  });
});
