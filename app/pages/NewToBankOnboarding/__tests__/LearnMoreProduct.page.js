import React from 'react';
import renderer from 'react-test-renderer';
import LearnMorePage from '../LearnMoreProduct.page';

jest.mock('../LearnMoreProduct.page');

describe('NTB Onboarding: LearnMroe about Product page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LearnMorePage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
