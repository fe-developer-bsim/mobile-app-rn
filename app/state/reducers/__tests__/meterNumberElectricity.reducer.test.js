import meterNumberElectricity from '../meterNumberElectricity.reducer';
import {SAVE_METER_NUMBER, CLEAR_SAVE_METER_NUMBER} from '../../actions/index.actions';

describe('Reducer: meterNumberElectricity', () => {

  it('Should return default state by default', () => {
    expect(meterNumberElectricity('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_METER_NUMBER,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(meterNumberElectricity('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_SAVE_METER_NUMBER
    };
    const expectedResult = '';
    expect(meterNumberElectricity('', action)).toEqual(expectedResult);
  });

});
