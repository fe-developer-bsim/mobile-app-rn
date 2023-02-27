import billerConfig from '../billerConfig.reducer';
import {BILLER_CONFIG_UPDATE, BILLER_CONFIG_CLEAR} from '../../actions/index.actions';

describe('Reducer: billerConfig', () => {

  it('Should return default state by default', () => {
    expect(billerConfig([], '')).toEqual([]);
  });

  it('Should set biller config', () => {
    const action = {
      type: BILLER_CONFIG_UPDATE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(billerConfig([], action)).toEqual(expectedResult);
  });

  it('Should reset biller config', () => {
    const action = {
      type: BILLER_CONFIG_CLEAR
    };
    const expectedResult = [];
    expect(billerConfig([], action)).toEqual(expectedResult);
  });

});
