import React from 'react';
import renderer from 'react-test-renderer';

import TabOutlets from '../tabOutlets.component';

describe('TabOutlets component', () => {
  it('TabOutlets: renders correctly', () => {
    const tree = renderer.create(<TabOutlets />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
