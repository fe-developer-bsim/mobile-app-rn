import creditCardHistory from '../creditCardHistory.reducer';
import * as actions from '../../actions/index.actions';

describe('Reducer: transactions', () => {
  const initialState = {creditCardTransactions: []};
  it('Should return default state by default', () => {
    expect(creditCardHistory(undefined, {})).toEqual(initialState);
  });
  it('Should update creditCardTransactions', () => {
    const action = {
      type: actions.CC_HISTORY_UPDATE,
      payload: [{
        'trxAmt': '80,000.00',
        'foreignTrxAmt': '80,000.00',
        'desc': 'KAZOKU SINARMAS LAND P   ',
        'PANUsed': '4893722000020223   ',
        'apprCode': '505048',
        'postDate': '23 May 2017',
        'trxAmtSign': 'D',
        'trxCurrCode': '360',
        'ARN': '70048932307000000000014',
        'Month': '201701',
        'trxDate': '23 May 2017'
      }]
    };
    const expectedcreditCardTransactions = [{
      'trxAmt': '80,000.00',
      'foreignTrxAmt': '80,000.00',
      'desc': 'KAZOKU SINARMAS LAND P   ',
      'PANUsed': '4893722000020223   ',
      'apprCode': '505048',
      'postDate': '23 May 2017',
      'trxAmtSign': 'D',
      'trxCurrCode': '360',
      'ARN': '70048932307000000000014',
      'Month': '201701',
      'trxDate': '23 May 2017'
    }];
    expect(creditCardHistory(initialState, action).creditCardTransactions).toEqual(expectedcreditCardTransactions);
  });
  it('CC_HISTORY_CLEAR: should clear all ', () => {
    const action = {
      type: actions.CC_HISTORY_CLEAR
    };
    const state = {creditCardTransactions: [{
      'trxAmt': '80,000.00',
      'foreignTrxAmt': '80,000.00',
      'desc': 'KAZOKU SINARMAS LAND P   ',
      'PANUsed': '4893722000020223   ',
      'apprCode': '505048',
      'postDate': '23 May 2017',
      'trxAmtSign': 'D',
      'trxCurrCode': '360',
      'ARN': '70048932307000000000014',
      'Month': '201701',
      'trxDate': '23 May 2017'
    }]};
    const expected = {creditCardTransactions: []};
    expect(creditCardHistory(state, action)).toEqual(expected);
  });
});
