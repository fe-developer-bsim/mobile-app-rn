import React from 'react';
import renderer from 'react-test-renderer';
import ActivationSuccess from '../ActivationSuccess.component';

describe('ActivationSuccess component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ActivationSuccess />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});