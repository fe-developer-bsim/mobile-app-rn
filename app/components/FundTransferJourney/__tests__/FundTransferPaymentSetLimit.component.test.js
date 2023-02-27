import React from 'react';
import renderer from 'react-test-renderer';
import FundTransfer from '../FundTransferPaymentSetLimit.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(FundTransfer);

describe('FundTransferPaymentSetLimit component', () => {
  it('renders correctly', () => {
    const myAccount = {test: 'test'};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={myAccount} handleSubmit={spy} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
