import paymentModal from '../paymentModal.reducer';
import {PAYMENT_MODAL_SHOW, PAYMENT_MODAL_HIDE} from '../../actions/index.actions';

describe('Reducer: paymentModal', () => {
  const initialState = {
    type: 'LOADING',
    heading: 'heading',
    subheading: 'subheading',
    transactionId: 'transactionId',
    timestamp: 'timestamp',
    transferTime: ''
  };
  it('Initial state', () => {
    expect(paymentModal(initialState, {})).toEqual(initialState);
  });
  it('PAYMENT_MODAL_SHOW: should show payment modal', () => {
    const expected = {...initialState};
    expect(paymentModal(initialState, {type: PAYMENT_MODAL_SHOW, payload: initialState})).toEqual(expected);
  });
  it('PAYMENT_MODAL_HIDE: should hide modal', () => {
    const passed = {...initialState};
    expect(paymentModal(passed, {type: PAYMENT_MODAL_HIDE})).toEqual(initialState);
  });
});
