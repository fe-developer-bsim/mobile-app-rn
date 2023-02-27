import React from 'react';
import renderer from 'react-test-renderer';
import ResultPA from '../ResultPA.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('ResultPA: ResultPA page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <ResultPA/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
