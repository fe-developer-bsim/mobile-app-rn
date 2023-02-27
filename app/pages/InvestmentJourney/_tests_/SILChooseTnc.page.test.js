import React from 'react';
import renderer from 'react-test-renderer';
import SILChooseTnc from '../SILChooseTnc.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

jest.mock('../SILChooseTnc.page');
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(SILChooseTnc);
describe('SILChooseTnc', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
