import mobileNumberPostpaid from '../mobileNumberPostpaid.reducer';
import {SAVE_MOBILE_NUMBER, CLEAR_MOBILE_NUMBER} from '../../actions/index.actions';

describe('Reducer: mobileNumberPostpaid', () => {

  it('Should return default state by default', () => {
    expect(mobileNumberPostpaid('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_MOBILE_NUMBER,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(mobileNumberPostpaid('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_MOBILE_NUMBER
    };
    const expectedResult = '';
    expect(mobileNumberPostpaid('', action)).toEqual(expectedResult);
  });

});
