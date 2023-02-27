import React from 'react';
import renderer from 'react-test-renderer';
import CreditCardHistory from '../CreditCardHistory.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(CreditCardHistory);

describe('CreditCardHistory page', () => {
  it('renders correctly', () => {
    const history = [
      {
        'ARN': '70048932307000000000014',
        'Month': '201701',
        'PANUsed': '4893722000020223   ',
        'apprCode': '505048',
        'desc': 'KAZOKU SINARMAS LAND P   ',
        'foreignTrxAmt': '80,000.00',
        'postDate': '23 May 2017',
        'trxAmt': '80,000.00',
        'trxAmtSign': 'D',
        'trxCurrCode': '360',
        'trxDate': '23 May 2017'
      },
      {
        'ARN': '70048932307000000000014',
        'Month': '201701',
        'PANUsed': '4893722000020223   ',
        'apprCode': '505048',
        'desc': 'KAZOKU SINARMAS LAND P   ',
        'foreignTrxAmt': '80,000.00',
        'postDate': '23 May 2017',
        'trxAmt': '80,000.00',
        'trxAmtSign': 'D',
        'trxCurrCode': '360',
        'trxDate': '23 May 2017'
      }
    ];
    const networkStatus = {isConnected: true};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} history={history} isConnected={networkStatus}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
