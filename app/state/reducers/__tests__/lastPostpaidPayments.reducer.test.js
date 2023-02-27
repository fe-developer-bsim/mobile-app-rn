import lastPostpaidPayments from '../lastPostpaidPayments.reducer';
import {LAST_POSTPAID_PAYMENTS_UPDATE_BILL_AMOUNT, LAST_POSTPAID_PAYMENTS_UPDATE, POSTPAID_PAYMENTS_CLEAR} from '../../actions/index.actions';

describe('Reducer: lastPostpaidPayments', () => {
  it('Should update postpaid payment', () => {
    const previousState = {'allTransactions': [{'billAmount': 1232, 'mobileNo': '13'}], 'recentPostpaidPayments': [{'billAmount': 1232, 'mobileNo': '13'}]};
    const payload = {mobileNo: '43', billAmount: 4562};
    const nextState = {'allTransactions': [{'billAmount': 1232, 'mobileNo': '13'}, {'billAmount': 4562, 'mobileNo': '43'}], 'recentPostpaidPayments': [{'billAmount': 4562, 'mobileNo': '43'}, {'billAmount': 1232, 'mobileNo': '13'}]};
    const action = {type: LAST_POSTPAID_PAYMENTS_UPDATE, payload};
    expect(lastPostpaidPayments(previousState, action)).toEqual(nextState);
  });
  it('Should update bill amount of existing postpaid payment', () => {
    const previousState = {'allTransactions': [{'mobileNo': '13'}], 'recentPostpaidPayments': [{'mobileNo': '13'}]};
    const payload = {mobileNo: '13', billAmount: 4562};
    const nextState = {'allTransactions': [{'billAmount': 4562, 'mobileNo': '13'}], 'recentPostpaidPayments': [{'billAmount': 4562, 'mobileNo': '13'}]};
    const action = {type: LAST_POSTPAID_PAYMENTS_UPDATE_BILL_AMOUNT, payload};
    expect(lastPostpaidPayments(previousState, action)).toEqual(nextState);
  });
  it('Should return default state by default', () => {
    const initialState =  {allTransactions: [], recentPostpaidPayments: []};
    expect(lastPostpaidPayments(undefined, {})).toEqual(initialState);
  });
  it('Should clear bill amount of existing postpaid payment', () => {
    const previousState = {'allTransactions': [{'mobileNo': '13'}], 'recentPostpaidPayments': [{'mobileNo': '13'}]};
    const nextState = {allTransactions: [], recentPostpaidPayments: []};
    const action = {type: POSTPAID_PAYMENTS_CLEAR};
    expect(lastPostpaidPayments(previousState, action)).toEqual(nextState);
  });
});
