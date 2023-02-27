import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyDashboard from '../EmoneyDashboard.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'TdCloseConfirmationForm'})(EmoneyDashboard);

describe('Home: EmoneyDashboard page', () => {
  xit('renders correctly', () => {
    const setDefaultAccEmoney = {};
    const tree = renderer.create(<Provider store={store}><DecoratedForm setDefaultAccEmoney={setDefaultAccEmoney}/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
