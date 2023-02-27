import React from 'react';
import renderer from 'react-test-renderer';

import ActiveList from '../ActiveList.component';

describe('ActiveList component', () => {
  it('ActiveList: renders correctly', () => {
    const tree = renderer.create(<ActiveList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
