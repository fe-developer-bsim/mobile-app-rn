import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyPage from '../ConfirmationEmail.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('BillerTypeSixConfirmation page', () => {
  xit('renders correctly', () => {
    const deeplinkCatcher = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <EmoneyPage deeplinkCatcher={deeplinkCatcher}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
