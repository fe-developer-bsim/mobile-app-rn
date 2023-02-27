import React from 'react';
import renderer from 'react-test-renderer';
import CreditCardConfirmation from '../CreditCardConfirmation.page';
import set from 'lodash/set';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(CreditCardConfirmation);

describe('CreditCardConfirmation page', () => {
  it('renders correctly', () => {
    const navigation = set({}, 'state.params', {});
    navigation.state.params.billDetails = {
      customerName: 'BURHAM'
    };
    navigation.state.params.biller = [{
      id: 47,
      name: 'Kartu Kredit Bank Sinarmas',
      path: '|_root||creditcard|'
    }];
    const networkStatus = {isConnected: true};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} navigation={navigation} isConnected={networkStatus}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
