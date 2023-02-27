import React from 'react';
import renderer from 'react-test-renderer';

import TabNearby from '../TabNearby.component';

describe('TabNearby component', () => {
  it('TabNearby: renders correctly', () => {
    const tree = renderer.create(<TabNearby />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
