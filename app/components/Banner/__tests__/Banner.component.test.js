import React from 'react';
import renderer from 'react-test-renderer';

import Banner from '../Banner.component';

describe('Banner component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Banner imageLink='test'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
