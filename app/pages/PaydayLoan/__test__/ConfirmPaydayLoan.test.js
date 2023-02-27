import React from 'react';
import renderer from 'react-test-renderer';
import AccountInfoItem from '../ConfirmPaydayLoan.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('OnboardingJourney: CompletedOnboarding page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <AccountInfoItem/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
