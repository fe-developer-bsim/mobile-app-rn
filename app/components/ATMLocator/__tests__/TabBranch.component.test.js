import React from 'react';
import renderer from 'react-test-renderer';

import TabBranch from '../TabBranch.component';

jest.mock('../TabBranch.component');

describe('TabBranch component', () => {
  it('TabBranch: renders correctly', () => {
    const tree = renderer.create(<TabBranch />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
