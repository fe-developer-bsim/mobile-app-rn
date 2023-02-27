import couponCounterDetail from '../couponCounterDetail.reducer';
import {SAVE_COUPON_COUNTER, CLEAR_COUPON_COUNTER} from '../../actions/index.actions';

describe('Reducer: cinemaCgv', () => {

  it('Should set biller config', () => {
    const action = {
      type: SAVE_COUPON_COUNTER,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(couponCounterDetail([], action)).toEqual(expectedResult);
  });

  it('Should reset biller config', () => {
    const action = {
      type: CLEAR_COUPON_COUNTER
    };
    const expectedResult = '';
    expect(couponCounterDetail([], action)).toEqual(expectedResult);
  });

});
