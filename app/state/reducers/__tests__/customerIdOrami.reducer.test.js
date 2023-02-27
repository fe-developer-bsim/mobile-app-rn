import customerIdOrami from '../customerIdOrami.reducer';
import {SAVE_CUSTOMERID_ORAMI, CLEAR_CUSTOMERID_ORAMI} from '../../actions/index.actions';

describe('Reducer: customerIdOrami', () => {

  it('Should return default state by default', () => {
    expect(customerIdOrami('', '')).toEqual('');
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_CUSTOMERID_ORAMI,
      payload: 'xx-000'
    };
    const expectedResult = 'xx-000';
    expect(customerIdOrami('', action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_CUSTOMERID_ORAMI
    };
    const expectedResult = '';
    expect(customerIdOrami('', action)).toEqual(expectedResult);
  });

});
