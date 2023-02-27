import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import SILeSPAJForm4 from '../SILeSPAJForm4.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(SILeSPAJForm4);

describe('SILeSPAJForm4 Component: PaymentSelection', () => {
  xit('renders correctly', () => {
    const formValues = {};
    const accounts = [];
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={formValues} accounts={accounts}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
