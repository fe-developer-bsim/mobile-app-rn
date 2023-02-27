import React from 'react';
import renderer from 'react-test-renderer';
import NewProxyConfirmationBIFast from '../NewProxyConfirmationBIFast.component';

describe('NewProxyConfirmationBIFast component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NewProxyConfirmationBIFast />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
