import React from 'react';
import renderer from 'react-test-renderer';
import {noop} from 'lodash';

import AutoDebitTransactions from '../AutoDebitTransactions.component';
import TransactionItem from '../../Transactions/TransactionItemPage.component';

describe('AutoDebitTransactions component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AutoDebitTransactions />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  xit('renderListItem should return TransactionItem', () => {
    const transactionList = [
      {
        'ACCOUNTNO': '38082247787729',
        'SUBSCRIBERID': '520077764594',
        'MERCHANTNAME': 'PLN Prepaid',
        'AMOUNT': 0,
        'TRANSACTIONDATE': '2021-08-14',
        'TRXTYPE': '0210',
        'PROCCODE': '380000',
        'STATUS': '03',
        'REFNUM': null,
        'ADDINFO': null,
        'BRANCHNAME': null,
        'ADID': 11043,
        'BRANCHCODE': null,
        'ORDERID': null,
        'REVSTATE': null,
        'ENTITYID': 11043,
        'ENTITYNAME': 'AutodebitOrder',
        'DETAIL': null
      }
    ];
    const itemProp = {
      'ACCOUNTNO': '38082247787729',
      'SUBSCRIBERID': '520077764594',
      'MERCHANTNAME': 'PLN Prepaid',
      'AMOUNT': 0,
      'TRANSACTIONDATE': '2021-08-14',
      'TRXTYPE': '0210',
      'PROCCODE': '380000',
      'STATUS': '03',
      'REFNUM': null,
      'ADDINFO': null,
      'BRANCHNAME': null,
      'ADID': 11043,
      'BRANCHCODE': null,
      'ORDERID': null,
      'REVSTATE': null,
      'ENTITYID': 11043,
      'ENTITYNAME': 'AutodebitOrder',
      'DETAIL': null,
      getDetailTransactionHistory: noop,
    };
    const expectedResult = {
      accountNumber: '38082247787729',
      description: 'PLN Prepaid',
      amount: '',
      currency: '',
      date: '14 Aug 2021',
      isShariaAccount: false,
      transactionCode: '0210',
      transactionLength: 1,
      getDetailTransactionHistory: noop,
      credit: false,
      failedAutoDebit: true,
      successAutoDebit: false,
    };
    const wrapper = renderer.create(<AutoDebitTransactions transactionList={transactionList}/>);
    expect(wrapper.getInstance().renderListItem(itemProp)).toEqual(<TransactionItem {...expectedResult}/>);
  });
});
