import inquiryBL from '../inquiryBL.reducer';
import {SAVE_INQUIRY_BILLER, CLEAR_INQUIRY_BILLER} from '../../actions/index.actions';

describe('Reducer: inquiryBL', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_INQUIRY_BILLER,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(inquiryBL([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_INQUIRY_BILLER
    };
    const expectedResult = {};
    expect(inquiryBL([], action)).toEqual(expectedResult);
  });

});

