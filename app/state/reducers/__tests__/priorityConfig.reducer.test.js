import priorityConfig from '../priorityConfig.reducer';
import {PRIORITY_CONFIG_POPULATE_DATA, PRIORITY_CONFIG_CLEAR} from '../../actions/index.actions';

describe('Reducer: savePicture', () => {

  it('Should set saving data', () => {
    const action = {
      type: PRIORITY_CONFIG_POPULATE_DATA,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(priorityConfig([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: PRIORITY_CONFIG_CLEAR
    };
    const expectedResult = {};
    expect(priorityConfig([], action)).toEqual(expectedResult);
  });

});

