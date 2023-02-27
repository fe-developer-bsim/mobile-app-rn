import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../SinarmasButtonOnboarding.component';

describe('Button component new', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Button/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
