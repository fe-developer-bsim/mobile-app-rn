import React from 'react';
import renderer from 'react-test-renderer';

import EmallCgvInfo from '../EmallTx.component';

describe('EmallCgvInfo component', () => {
  it('EmallCgvInfo: renders correctly', () => {
    const tree = renderer.create(<EmallCgvInfo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
