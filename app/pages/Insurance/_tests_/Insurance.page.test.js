import React from 'react';
import renderer from 'react-test-renderer';
import Insurance from '../Insurance.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('Insurance: Insurance page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <Insurance/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
