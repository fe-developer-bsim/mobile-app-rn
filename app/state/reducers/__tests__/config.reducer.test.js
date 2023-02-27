import config from '../config.reducer';
import {CONFIG_POPULATE_DATA, CONFIG_CLEAR} from '../../actions/index.actions';

describe('Reducer: config', () => {

  it('Should return default state by default', () => {
    expect(config({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: CONFIG_POPULATE_DATA,
      payload: 'xx-000'
    };
    const expectedResult = {'0': 'x',
      '1': 'x',
      '2': '-',
      '3': '0',
      '4': '0',
      '5': '0'};
    expect(config({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CONFIG_CLEAR
    };
    const expectedResult = {};
    expect(config({}, action)).toEqual(expectedResult);
  });

});
