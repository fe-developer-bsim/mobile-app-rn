import qrDiscount from '../qrDiscount.reducer';
import {SAVE_QR_DISCOUNT, UPDATE_QR_DISCOUNT, CLEAR_QR_DISCOUNT} from '../../actions/index.actions';

describe('Reducer: qrDiscount', () => {

  it('Should return default state by default', () => {
    expect(qrDiscount('', '')).toEqual('');
  });
  
  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_QR_DISCOUNT,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(qrDiscount('', action)).toEqual(expectedResult);
  });
  
  it('Should reset transaction Reference Number', () => {
    const action = {
      type: UPDATE_QR_DISCOUNT,
      payload: 'xx-000'
    };
    const expectedResult = ['x', 'x', '-', '0', '0', '0'];
    expect(qrDiscount('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_QR_DISCOUNT
    };
    const expectedResult = [];
    expect(qrDiscount('', action)).toEqual(expectedResult);
  });
  
});
  