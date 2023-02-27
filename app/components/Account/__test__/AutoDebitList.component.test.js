import React from 'react';
import renderer from 'react-test-renderer';
import AutoDebit from '../AutoDebitList.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
})(AutoDebit);

describe('AutoDebit component', () => {
  it('renders correctly', () => {
    // const formValues = {};
    const accountInfo = {};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm accountInfo={accountInfo} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
