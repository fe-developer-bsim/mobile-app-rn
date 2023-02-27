import React from 'react';
import renderer from 'react-test-renderer';

import TabSimasPoin from '../TabSimasPoin.component';

describe('TabSimasPoin component', () => {
  it('TabSimasPoin: renders correctly', () => {
    const tree = renderer.create(<TabSimasPoin />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
