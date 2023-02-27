import React from 'react';
import renderer from 'react-test-renderer';
import SignaturePage from '../Signature.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('BillerTypeSixConfirmation page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <SignaturePage/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
