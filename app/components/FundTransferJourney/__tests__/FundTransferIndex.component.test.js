import React from 'react';
import renderer from 'react-test-renderer';
import FundTransferIndex from '../FundTransferIndex.component';

describe('FundTransferIndex component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FundTransferIndex/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
