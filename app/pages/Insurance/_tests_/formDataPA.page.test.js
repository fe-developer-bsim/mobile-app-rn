import React from 'react';
import renderer from 'react-test-renderer';
import formDataPA from '../formDataPA.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('formDataPA: formDataPA page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <formDataPA/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
