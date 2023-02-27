import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import TdForm from '../TdForm.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(TdForm);

describe('TdForm should render', () => {
  it('renders correctly', () => {
    const formValues = {};
    const accounts = [];
    const savingAccounts = [];
    const changeTdPeriodList = jest.fn();
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={formValues} accounts={accounts} savingAccounts={savingAccounts} changeTdPeriodList={changeTdPeriodList}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
