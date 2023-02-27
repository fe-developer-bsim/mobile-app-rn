import addFavoriteTrxSearch from '../addFavoriteTrxSearch.reducer';
import {SAVE_ADD_FAVORITE_TRX, CLEAR_ADD_FAVORITE_TRX} from '../../actions/index.actions';

describe('Reducer: showSpinner', () => {
  it('Should return default state by default', () => {
    expect(addFavoriteTrxSearch(undefined, false)).toEqual(false);
  });
  it('Should save value time td search', () => {
    expect(addFavoriteTrxSearch('', {type: SAVE_ADD_FAVORITE_TRX, payload: true})).toEqual(true);
  });
  it('Should clear value time td search', () => {
    expect(addFavoriteTrxSearch(false, {type: CLEAR_ADD_FAVORITE_TRX})).toEqual(false);
  });
});
