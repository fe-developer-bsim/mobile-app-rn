import pgoLoanCount from '../pgoLoanCount.reducer';
import {SAVE_OFFERS_COUNT, CLEAR_OFFERS_COUNT} from '../../actions/index.actions';

describe('Reducer: pgoLoanCount', () => {
  it('Should return default state by default', () => {
    expect(pgoLoanCount(undefined, '')).toEqual('');
  });
  it('Should save pgoLoanCount', () => {
    expect(pgoLoanCount('', {type: SAVE_OFFERS_COUNT, payload: '123'})).toEqual('123');
  });
  it('Should clear pgoLoanCount', () => {
    expect(pgoLoanCount('123', {type: CLEAR_OFFERS_COUNT})).toEqual('');
  });
});