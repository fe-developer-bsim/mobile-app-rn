import CouponPaymentStatus from '../CouponPaymentStatus.reducer';
import {SAVE_PAYMENT_STATUS_COUPON, DELETE_PAYMENT_STATUS_COUPON} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set billerDeeplink config', () => {
    const action = {
      type: SAVE_PAYMENT_STATUS_COUPON,
      payload: 'wasd'
    };
    const expectedResult = 'wasd';
    expect(CouponPaymentStatus('', action)).toEqual(expectedResult);
  });

  it('Should reset billerDeeplink config', () => {
    const action = {
      type: DELETE_PAYMENT_STATUS_COUPON,
      payload: ''
    };
    const expectedResult = '';
    expect(CouponPaymentStatus('', action)).toEqual(expectedResult);
  });

});
