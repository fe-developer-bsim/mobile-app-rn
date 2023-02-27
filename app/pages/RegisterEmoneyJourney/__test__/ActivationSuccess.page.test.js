import React from 'react';
import renderer from 'react-test-renderer';
import ActivationSuccessPage from '../ActivationSuccess.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('ActivationSuccess page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <ActivationSuccessPage/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
