import React from 'react';
import renderer from 'react-test-renderer';

import BlockList from '../BlockList.component';

describe('BlockList component', () => {
  it('BlockList: renders correctly', () => {
    const tree = renderer.create(<BlockList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
