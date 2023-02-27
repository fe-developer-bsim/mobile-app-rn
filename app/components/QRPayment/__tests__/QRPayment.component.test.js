import React from 'react';
import renderer from 'react-test-renderer';
import QRPaymentPayment from '../QRPayment.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
jest.mock('react-timer-mixin');

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(QRPaymentPayment);

describe('QRPaymentPayment component', () => {
  const formValues = {
    amount: '219276',
    myAccount: {accountMode: null,
      accountNumber: '0002838796',
      accountType: 'savingaccount',
      accountTypeCode: '6003',
      allowFlag: 'ft|bp|oa|tds',
      balances: {
        accountNumber: '0002838796',
        availableBalance: 32047803.55,
        currency: 'IDR',
        currentBalance: 32047803.55,
        workingBalance: 32047803.55
      },
      bank: 'PT BANK SINARMAS',
      bankBranch: {
        address: 'Jl. K.H. Fachruddin Ruko Alfa No. |',
        code: 'ID0010007',
        id: 7,
        name: 'KC Tanah Abang',
      },
      currency: 'IDR',
      display: '0002838796 • savingaccount • M FERDIANSYAH',
      id: 10322,
      label: '0002838796/IDR/SavingAccount/M FERDIANSYAH',
      name: 'M FERDIANSYAH',
    },
    paymentMode: 'outstanding'
  };

  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} formValues={formValues}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
