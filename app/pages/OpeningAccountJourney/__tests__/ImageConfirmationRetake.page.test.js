import React from 'react';
import renderer from 'react-test-renderer';
import CompletedOnboarding from '../ImageConfirmationRetake.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('OnboardingJourney: CompletedOnboarding page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <CompletedOnboarding/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
