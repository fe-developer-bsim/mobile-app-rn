import React from 'react';
import renderer from 'react-test-renderer';
import BeliPolisSIL from '../BeliPolisSIL.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(BeliPolisSIL);
describe('BeliPolisSIL', () => {
  xit('renders correctly', () => {
    const items = [];
    const tree = renderer.create(<Provider store={store} items={items}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
