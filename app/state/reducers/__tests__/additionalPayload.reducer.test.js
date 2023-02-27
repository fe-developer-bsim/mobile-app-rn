import additionalPayload from '../additionalApiPayload.reducer';
import {SET_ADDITIONAL_API_PAYLOAD_PARAMETER, CLEAR_ADDITIONAL_API_PAYLOAD_PARAMETER} from '../../actions/index.actions';
import {deviceInfo} from '../../../utils/device.util';
describe('Reducer: additionalPayload', () => {

  it('Should return default state by default', () => {
    expect(additionalPayload({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SET_ADDITIONAL_API_PAYLOAD_PARAMETER,
      payload: 'xx-000'
    };
    const expectedResult = {'0': 'x',
      '1': 'x',
      '2': '-',
      '3': '0',
      '4': '0',
      '5': '0'};
    expect(additionalPayload({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_ADDITIONAL_API_PAYLOAD_PARAMETER
    };
    const expectedResult = {ipassport: null,
      securityTypeCode: '11',
      language: 'en',
      deviceParam: deviceInfo.id,
      tokenClient: null,
      tokenServer: null,
      sessionCode: null,
      E2EE_RANDOM: '123456'};
    expect(additionalPayload({}, action)).toEqual(expectedResult);
  });

});
