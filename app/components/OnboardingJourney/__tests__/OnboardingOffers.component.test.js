import React from 'react';
import renderer from 'react-test-renderer';
import OnboardingOffers from '../OnboardingOffers.component';

describe('OnboardingOffers component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<OnboardingOffers />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
