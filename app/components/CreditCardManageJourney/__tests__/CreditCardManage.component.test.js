import React from 'react';
import renderer from 'react-test-renderer';
import CreditCardManage from '../CreditCardManage.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(CreditCardManage);

describe('CreditCardManage component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm navigate={jest.fn()} dispatch={jest.fn()}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
