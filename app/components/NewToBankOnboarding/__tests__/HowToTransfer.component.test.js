import React from 'react';
import renderer from 'react-test-renderer';
import HowToTransfer from '../HowToTransfer.component';

describe('How To Transfer component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HowToTransfer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
