import searchStoreAlfacart from '../searchStoreAlfacart.reducer';
import {SAVE_ALFA_SEARCH_STORE, DELETE_ALFA_SEARCH_STORE} from '../../actions/index.actions';

describe('Reducer: searchStoreAlfacart', () => {
  xit('Should return default state by default', () => {
    expect(searchStoreAlfacart(undefined, undefined)).toEqual(undefined);
  });
  xit('Should save alfacart', () => {
    expect(searchStoreAlfacart('', {type: SAVE_ALFA_SEARCH_STORE, payload: '123'})).toEqual('123');
  });
  xit('Should clear alfacart', () => {
    expect(searchStoreAlfacart(undefined, {type: DELETE_ALFA_SEARCH_STORE})).toEqual(undefined);
  });
});
