import React from 'react';
import renderer from 'react-test-renderer';
import EditProxyConfirmationBIFast from '../EditProxyConfirmationBIFast.component';

describe('EditProxyConfirmationBIFast component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EditProxyConfirmationBIFast />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
