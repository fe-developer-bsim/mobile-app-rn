import lastWaterPayments from '../lastWaterPayments.reducer';
import {LAST_WATER_PAYMENTS_UPDATE, LAST_WATER_PAYMENTS_BILL_AMOUNT, WATER_PAYMENTS_CLEAR} from '../../actions/index.actions';

describe('Reducer: lastWaterPayments', () => {
  it('Should update lastWaterPayments', () => {
    const previousState = {'allWaterPayments': [{'billAmount': 1232, 'consumerNo': '13'}],
      'recentWaterPayments': [{'billAmount': 1232, 'consumerNo': '13'}]};
    const payload = {consumerNo: '43', billAmount: 4562};
    const nextState = {'allWaterPayments': [{'billAmount': 1232, 'consumerNo': '13'}, {'billAmount': 4562, 'consumerNo': '43'}], 'recentWaterPayments': [{'billAmount': 4562, 'consumerNo': '43'}, {'billAmount': 1232, 'consumerNo': '13'}]};
    const action = {type: LAST_WATER_PAYMENTS_UPDATE, payload};
    expect(lastWaterPayments(previousState, action)).toEqual(nextState);
  });
  it('Should update bill amount of existing lastWaterPayments', () => {
    const previousState = {'allWaterPayments': [{'consumerNo': '13'}], 'recentWaterPayments': [{'consumerNo': '13'}]};
    const payload = {consumerNo: '13', billAmount: 4562};
    const nextState = {'allWaterPayments': [{'billAmount': 4562, 'consumerNo': '13'}], 'recentWaterPayments': [{'billAmount': 4562, 'consumerNo': '13'}]};
    const action = {type: LAST_WATER_PAYMENTS_BILL_AMOUNT, payload};
    expect(lastWaterPayments(previousState, action)).toEqual(nextState);
  });
  it('Should clear lastWaterPayments', () => {
    const nextState =  {allWaterPayments: [], recentWaterPayments: []};
    const previousState = {'allTransactions': [{'accNo': 111111, 'name': 'wasd'}], 'recentTransactions': [{'accNo': 111111, 'name': 'wasd'}]};
    const action = {type: WATER_PAYMENTS_CLEAR};
    expect(lastWaterPayments(previousState, action)).toEqual(nextState);
  });
});
