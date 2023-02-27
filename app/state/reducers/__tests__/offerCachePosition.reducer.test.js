import offerCachePosition from '../offerCachePosition.reducer';
import {SAVE_CACHE_OFFERS, CLEAR_CACHE_OFFERS} from '../../actions/index.actions';

describe('Reducer: offerCachePosition', () => {
  it('Should return default state by default', () => {
    expect(offerCachePosition(undefined, '')).toEqual('');
  });
  it('Should save offerCachePosition', () => {
    expect(offerCachePosition('', {type: SAVE_CACHE_OFFERS, payload: '123'})).toEqual('123');
  });
  it('Should clear offerCachePosition', () => {
    expect(offerCachePosition('123', {type: CLEAR_CACHE_OFFERS})).toEqual('');
  });
});
