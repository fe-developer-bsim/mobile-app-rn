import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../SinarmasButton.component';

describe('Button component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Button/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
