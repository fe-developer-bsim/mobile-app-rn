import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyPage from '../AgreementEmoney.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('BillerTypeSixConfirmation page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <EmoneyPage/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
