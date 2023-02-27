import sinarmasAlert from '../sinarmasAlert.reducer';
import {SINARMAS_ALERT_SHOW, SINARMAS_ALERT_HIDE} from '../../actions/index.actions';

describe('Reducer: additionalPayload', () => {

  it('Should return default state by default', () => {
    expect(sinarmasAlert({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SINARMAS_ALERT_SHOW,
      payload: 'xx-000'
    };
    const expectedResult = {'0': 'x',
      '1': 'x',
      '2': '-',
      '3': '0',
      '4': '0',
      '5': '0',
      visible: true};
    expect(sinarmasAlert({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: SINARMAS_ALERT_HIDE
    };
    const expectedResult = {visible: false};
    expect(sinarmasAlert({}, action)).toEqual(expectedResult);
  });

});
