import lastElectricityPayments from '../lastElectricityPayments.reducer';
import {LAST_ELECTRICITY_PAYMENTS_UPDATE, LAST_ELECTRICITY_PAYMENTS_BILL_AMOUNT, ELECTRICITY_PAYMENTS_CLEAR, ALL_ELECTRICITY_PAYMENTS} from '../../actions/index.actions';

describe('Reducer: lastElectricityPayments', () => {
  it('Should return default state', () => {
    const nextState =  {allTransactions: [], recentElectricityPayments: []};
    expect(lastElectricityPayments(undefined, {})).toEqual(nextState);
  });
  it('Should update postpaid payment', () => {
    const previousState = {'allTransactions': [{'billAmount': 1232, 'meterNo': '13'}], 'recentElectricityPayments': [{'billAmount': 1232, 'meterNo': '13'}]};
    const payload = {meterNo: '43', billAmount: 4562};
    const nextState = {'allTransactions': [{'billAmount': 1232, 'meterNo': '13'}, {'billAmount': 4562, 'meterNo': '43'}], 'recentElectricityPayments': [{'billAmount': 4562, 'meterNo': '43'}, {'billAmount': 1232, 'meterNo': '13'}]};
    const action = {type: LAST_ELECTRICITY_PAYMENTS_UPDATE, payload};
    expect(lastElectricityPayments(previousState, action)).toEqual(nextState);
  });
  it('Should return all postpaid payment', () => {
    const previousState = {};
    const payload = [{meterNo: '43', billAmount: 4562}];
    const nextState = {'allTransactions': [{
      'billAmount': 4562,
      'meterNo': '43',
    }],
    'recentElectricityPayments': [{
      'billAmount': 4562,
      'meterNo': '43',
    }]
    };
    const action = {type: ALL_ELECTRICITY_PAYMENTS, payload};
    expect(lastElectricityPayments(previousState, action)).toEqual(nextState);
  });
  it('Should update bill amount of existing postpaid payment', () => {
    const previousState = {'allTransactions': [{'meterNo': '13'}], 'recentElectricityPayments': [{'meterNo': '13'}]};
    const payload = {meterNo: '13', billAmount: 4562};
    const nextState = {'allTransactions': [{'billAmount': 4562, 'meterNo': '13'}], 'recentElectricityPayments': [{'billAmount': 4562, 'meterNo': '13'}]};
    const action = {type: LAST_ELECTRICITY_PAYMENTS_BILL_AMOUNT, payload};
    expect(lastElectricityPayments(previousState, action)).toEqual(nextState);
  });
  it('Should clear postpaid payment', () => {
    const previousState = {'allTransactions': [{'billAmount': 1232, 'meterNo': '13'}], 'recentElectricityPayments': [{'billAmount': 1232, 'meterNo': '13'}]};
    const nextState = {allTransactions: [], recentElectricityPayments: []};
    const action = {type: ELECTRICITY_PAYMENTS_CLEAR};
    expect(lastElectricityPayments(previousState, action)).toEqual(nextState);
  });
});
