import valueTimeDepositSearch from '../valueTimeDepositSearch.reducer';
import {SAVE_VALUE_TD, CLEAR_VALUE_TD} from '../../actions/index.actions';

describe('Reducer: showSpinner', () => {
  it('Should return default state by default', () => {
    expect(valueTimeDepositSearch(undefined, false)).toEqual(false);
  });
  it('Should save value time td search', () => {
    expect(valueTimeDepositSearch('', {type: SAVE_VALUE_TD, payload: true})).toEqual(true);
  });
  it('Should clear value time td search', () => {
    expect(valueTimeDepositSearch(false, {type: CLEAR_VALUE_TD})).toEqual(false);
  });
});
