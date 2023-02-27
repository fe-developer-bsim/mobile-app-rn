import deviceData from '../deviceData.reducer';
import {SAVE_DEVICE_DATA, CLEAR_DEVICE_DATA} from '../../actions/index.actions';

describe('Reducer: deviceData', () => {

  it('Should return default state by default', () => {
    expect(deviceData([], {})).toEqual([]);
  });

  it('Should clear user data', () => {
    const action = {
      type: CLEAR_DEVICE_DATA,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = {};
    expect(deviceData([], action)).toEqual(expectedResult);
  });

  it('Should set payee data', () => {
    const action = {
      type: SAVE_DEVICE_DATA,
      payload: [{
        accountNumber: '123'
      }]
    };
    const expectedResult = [{
      accountNumber: '123'
    }];
    expect(deviceData([], action)).toEqual(expectedResult);
  });
});
