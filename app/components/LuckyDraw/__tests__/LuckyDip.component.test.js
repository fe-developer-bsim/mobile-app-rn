import React from 'react';
import renderer from 'react-test-renderer';

import LuckyDip from '../LuckyDip.component';

describe('LuckyDip component', () => {
  it('LuckyDip: renders correctly', () => {
    const tree = renderer.create(<LuckyDip />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
