import sinarmasInputAlert from '../sinarmasInputAlert.reducer';
import {SINARMAS_INPUT_ALERT_SHOW, SINARMAS_INPUT_ALERT_HIDE} from '../../actions/index.actions';

describe('Reducer: additionalPayload', () => {

  it('Should return default state by default', () => {
    expect(sinarmasInputAlert({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SINARMAS_INPUT_ALERT_SHOW,
      payload: 'xx-000'
    };
    const expectedResult = {'0': 'x',
      '1': 'x',
      '2': '-',
      '3': '0',
      '4': '0',
      '5': '0',
      visible: true};
    expect(sinarmasInputAlert({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: SINARMAS_INPUT_ALERT_HIDE
    };
    const expectedResult = {visible: false};
    expect(sinarmasInputAlert({}, action)).toEqual(expectedResult);
  });

});
