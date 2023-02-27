import showCardlessGuide from '../showCardlessGuide.reducer';
import {SAVE_CASH_MODAL, CLEAR_CASH_MODAL} from '../../actions/index.actions';

describe('Reducer: ccCode', () => {
  it('Should return default state by default', () => {
    expect(showCardlessGuide(undefined, '')).toEqual('');
  });
  it('Should save cc code', () => {
    expect(showCardlessGuide('', {type: SAVE_CASH_MODAL, payload: '123'})).toEqual('123');
  });
  it('Should clear cc code', () => {
    expect(showCardlessGuide('123', {type: CLEAR_CASH_MODAL})).toEqual('');
  });
});
