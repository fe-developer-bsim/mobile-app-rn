import React from 'react';
import renderer from 'react-test-renderer';

import TabAll from '../TabAll.component';

describe('TabAll component', () => {
  xit('TabAll: renders correctly', () => {
    const tree = renderer.create(<TabAll />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
