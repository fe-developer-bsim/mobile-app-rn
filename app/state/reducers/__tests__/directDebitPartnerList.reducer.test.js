import directDebitPartnerList from '../directDebitPartnerList.reducer';
import {SAVE_PARTNER_LIST, CLEAR_PARTNER_LIST} from '../../actions/index.actions';

describe('Reducer: directDebitPartnerList', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_PARTNER_LIST,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(directDebitPartnerList([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_PARTNER_LIST
    };
    const expectedResult = {};
    expect(directDebitPartnerList([], action)).toEqual(expectedResult);
  });

});

