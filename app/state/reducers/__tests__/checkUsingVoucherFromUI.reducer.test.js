import customerIdOrami from '../checkUsingVoucherFromUI.reducer';
import {SAVE_CONTROLLER_USINGCOUPON, CLEAR_CONTROLLER_USINGCOUPON} from '../../actions/index.actions';

describe('Reducer: customerIdOrami', () => {

  it('Should return default state by default', () => {
    expect(customerIdOrami('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_CONTROLLER_USINGCOUPON,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(customerIdOrami('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_CONTROLLER_USINGCOUPON
    };
    const expectedResult = '';
    expect(customerIdOrami('', action)).toEqual(expectedResult);
  });

});
