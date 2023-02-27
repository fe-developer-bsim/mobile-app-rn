import React from 'react';
import renderer from 'react-test-renderer';
import HowToTransfer from '../HowToTransfer.page';

describe('NTB Onboarding: How to transfer', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HowToTransfer/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
