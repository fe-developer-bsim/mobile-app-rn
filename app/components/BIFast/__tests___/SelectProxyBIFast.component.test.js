import React from 'react';
import renderer from 'react-test-renderer';
import SelectProxyBIFast from '../SelectProxyBIFast.component';

describe('SelectProxyBIFast component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SelectProxyBIFast />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
