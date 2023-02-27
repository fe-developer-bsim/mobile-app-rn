import ConfirmCheckoutAlfa from '../ConfrimCheckoutAlfa.reducer';
import {SAVE_ALL_CONFRIM_CHECKOUT_ALFA, CLEAR_ALL_CONFRIM_CHECKOUT_ALFA} from '../../actions/index.actions';

describe('Reducer: ConfirmCheckoutAlfa', () => {
  it('Should return default state by default', () => {
    expect(ConfirmCheckoutAlfa(undefined, [])).toEqual([]);
  });
  it('Should save checkout', () => {
    expect(ConfirmCheckoutAlfa('', {type: SAVE_ALL_CONFRIM_CHECKOUT_ALFA, payload: '123'})).toEqual('123');
  });
  it('Should clear checkout', () => {
    expect(ConfirmCheckoutAlfa('123', {type: CLEAR_ALL_CONFRIM_CHECKOUT_ALFA})).toEqual('');
  });
});
