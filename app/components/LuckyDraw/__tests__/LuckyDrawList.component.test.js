import React from 'react';
import renderer from 'react-test-renderer';

import LuckyDrawList from '../LuckyDrawList.component';

describe('LuckyDrawList component', () => {
  it('LuckyDrawList: renders correctly', () => {
    const tree = renderer.create(<LuckyDrawList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
