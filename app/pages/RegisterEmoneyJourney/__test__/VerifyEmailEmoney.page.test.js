import React from 'react';
import renderer from 'react-test-renderer';
import VerifyEmailEmoneyPage from '../VerifyEmailEmoney.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('VerifyEmailEmoney page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <VerifyEmailEmoneyPage/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
