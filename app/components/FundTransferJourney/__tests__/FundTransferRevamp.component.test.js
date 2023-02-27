import React from 'react';
import renderer from 'react-test-renderer';

import FundTransferRevamp from '../FundTransferRevamp.component';

describe('FundTransferRevamp component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FundTransferRevamp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
