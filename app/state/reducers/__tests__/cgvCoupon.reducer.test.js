import appInitKeys from '../cgvCoupon.reducer';
import {SAVE_CGV_COUPON, CLEAR_CGV_COUPON} from '../../actions/index.actions';

describe('Reducer: appInitKeys', () => {

  it('Should return default state by default', () => {
    expect(appInitKeys({}, '')).toEqual({});
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_CGV_COUPON,
      payload: {test: 'xx-000'}
    };
    const expectedResult = {test: 'xx-000'};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_CGV_COUPON
    };
    const expectedResult = {};
    expect(appInitKeys({}, action)).toEqual(expectedResult);
  });

});
