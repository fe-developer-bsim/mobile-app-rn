import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import SetLimitEdit from '../SetLimitEdit.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
})(SetLimitEdit);

describe('SetLimitEdit Component', () => {
  it('renders correctly', () => {
    const formValues = {};
    const accounts = [];
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={formValues} accounts={accounts} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
