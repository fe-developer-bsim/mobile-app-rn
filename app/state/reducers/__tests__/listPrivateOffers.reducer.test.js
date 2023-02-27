import listPrivateOffers from '../listPrivateOffers.reducer';
import {SAVE_PRIVATE_OFFERS, CLEAR_PRIVATE_OFFERS} from '../../actions/index.actions';

describe('Reducer: user', () => {

  it('Should return default state by default', () => {
    expect(listPrivateOffers([], '')).toEqual([]);
  });

  it('Should set transaction Reference Number', () => {
    const action = {
      type: SAVE_PRIVATE_OFFERS,
      payload: []
    };
    const expectedResult = [];
    expect(listPrivateOffers([], action)).toEqual(expectedResult);
  });

  it('Should reset transaction Reference Number', () => {
    const action = {
      type: CLEAR_PRIVATE_OFFERS
    };
    const expectedResult = [];
    expect(listPrivateOffers([], action)).toEqual(expectedResult);
  });
});
