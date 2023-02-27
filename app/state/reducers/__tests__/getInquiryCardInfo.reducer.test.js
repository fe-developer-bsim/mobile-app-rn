import getInquiryCardInfo from '../getInquiryCardInfo.reducer';
import {SAVE_INQUIRY_CARD_INFO, CLEAR_INQUIRY_CARD_INFO} from '../../actions/index.actions';

describe('Reducer: getInquiryCardInfo', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_INQUIRY_CARD_INFO,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(getInquiryCardInfo([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_INQUIRY_CARD_INFO
    };
    const expectedResult = {};
    expect(getInquiryCardInfo([], action)).toEqual(expectedResult);
  });

});

