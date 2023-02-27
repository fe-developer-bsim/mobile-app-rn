import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import SimasInvestaLinkEmFund from '../SimasInvestaLinkEmFund.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(SimasInvestaLinkEmFund);

describe('SimasInvestaLinkEmFund Component: PaymentSelection', () => {
  xit('renders correctly', () => {
    const showAlert = jest.fn(() => 2);
    const formValues = {};
    const accounts = [];
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm showAlert={showAlert} formValues={formValues} accounts={accounts}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
