import registTempName from '../regisTempName.reducer';
import {SAVE_REGIST_NAME, CLEAR_REGIST_NAME} from '../../actions/index.actions';

describe('Reducer: referralCode', () => {

  it('Should return default state by default', () => {
    expect(registTempName('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_REGIST_NAME,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(registTempName('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_REGIST_NAME
    };
    const expectedResult = '';
    expect(registTempName('', action)).toEqual(expectedResult);
  });

});
