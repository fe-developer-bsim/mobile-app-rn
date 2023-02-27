import React from 'react';
import renderer from 'react-test-renderer';
import SearchATMBranch from '../SearchATMBranch.page';
jest.mock('react-timer-mixin');

describe('SearchATMBranch: SearchATMBranch page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SearchATMBranch/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
