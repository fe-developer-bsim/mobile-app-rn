import React from 'react';
import renderer from 'react-test-renderer';

import SearchATMBranch from '../SearchATMBranch.component';

jest.mock('../SearchATMBranch.component');

describe('SearchATMBranch component', () => {
  it('SearchATMBranch: renders correctly', () => {
    const tree = renderer.create(<SearchATMBranch />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
