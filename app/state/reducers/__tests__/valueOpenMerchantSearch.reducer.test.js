import valueOpenMerchantSearch from '../valueOpenMerchantSearch.reducer';
import {SAVE_VALUE_OPEN_MERCHANT, CLEAR_VALUE_OPEN_MERCHANT} from '../../actions/index.actions';

describe('Reducer: showSpinner', () => {
  it('Should return default state by default', () => {
    expect(valueOpenMerchantSearch(undefined, false)).toEqual(false);
  });
  it('Should save value time td search', () => {
    expect(valueOpenMerchantSearch('', {type: SAVE_VALUE_OPEN_MERCHANT, payload: true})).toEqual(true);
  });
  it('Should clear value time td search', () => {
    expect(valueOpenMerchantSearch(false, {type: CLEAR_VALUE_OPEN_MERCHANT})).toEqual(false);
  });
});
