import React from 'react';
import renderer from 'react-test-renderer';
import CreditCardAccount from '../CreditCardAccount.page';
import set from 'lodash/set';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(CreditCardAccount);

describe('CreditCardAccount page', () => {
  it('renders correctly', () => {
    const navigation = set({}, 'state.params', {});
    navigation.state.params.biller = [
      {
        billerPreferences: {
          billerType: '5',
          code: '300002',
          currency: 'IDR',
          denomKey: '',
          id: 47,
        },
        id: 47,
        name: 'Kartu Kredit Bank Sinarmas'
      }
    ];
    const networkStatus = {isConnected: true};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} navigation={navigation} isConnected={networkStatus}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
