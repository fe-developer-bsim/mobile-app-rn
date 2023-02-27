import mPinOtp from '../mPinOtp.reducer';
import {SAVE_MPIN, CLEAR_MPIN} from '../../actions/index.actions';

describe('Reducer: mPinOtp', () => {

  xit('Should set biller config', () => {
    const action = {
      type: SAVE_MPIN,
      payload: {test: 'wasd'}
    };
    const expectedResult = '';
    expect(mPinOtp([], action)).toEqual(expectedResult);
  });

  xit('Should reset biller config', () => {
    const action = {
      type: CLEAR_MPIN
    };
    const expectedResult = '';
    expect(mPinOtp([], action)).toEqual(expectedResult);
  });

});
