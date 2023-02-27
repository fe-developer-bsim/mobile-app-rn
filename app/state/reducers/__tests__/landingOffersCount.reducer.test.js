import landingOffers from '../landingOffersCount.reducer';
import {SAVE_LANDING_OFFERS, CLEAR_LANDING_OFFERS} from '../../actions/index.actions';

describe('Reducer: landingOffers', () => {
  it('Should return default state by default', () => {
    expect(landingOffers(undefined, '')).toEqual('');
  });
  it('Should save landingOffers', () => {
    expect(landingOffers('', {type: SAVE_LANDING_OFFERS, payload: '123'})).toEqual('123');
  });
  it('Should clear landingOffers', () => {
    expect(landingOffers('123', {type: CLEAR_LANDING_OFFERS})).toEqual('');
  });
});
