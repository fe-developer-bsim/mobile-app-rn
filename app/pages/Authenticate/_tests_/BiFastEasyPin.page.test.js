import React from 'react';
import renderer from 'react-test-renderer';
import BiFastEasyPin from '../BiFastEasyPin.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'BiFastEasyPin'})(BiFastEasyPin);

describe('BiFastEasyPin: BiFastEasyPin page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
