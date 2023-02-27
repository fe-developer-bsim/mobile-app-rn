import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import CreditCardFinalizeForm from '../CreditCardFinalizeForm.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(CreditCardFinalizeForm);

describe('CreditCardFinalizeForm Component: create new credit card journey', () => {
  it('renders correctly', () => {
    const formValues = {};
    const accounts = [];
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={formValues} accounts={accounts} mockImageLocation={true}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
