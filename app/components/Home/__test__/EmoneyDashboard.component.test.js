import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyDashboard from '../EmoneyDashboard.component';
import {reduxForm} from 'redux-form';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm'
})(EmoneyDashboard);

describe('EmoneyDashboard component', () => {

  xit('renders correctly', () => {
    const accounts = {};
    const setDefaultAccEmoney = {};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm tabAccounts={accounts} setDefaultAccEmoney={setDefaultAccEmoney}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
