import React from 'react';
import renderer from 'react-test-renderer';
import PremiPA from '../PremiPA.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('PremiPA: PremiPA page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <PremiPA/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
