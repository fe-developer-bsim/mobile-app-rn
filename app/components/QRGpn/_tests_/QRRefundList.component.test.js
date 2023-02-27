import React from 'react';
import renderer from 'react-test-renderer';

import QRRefundList from '../QRRefundList.component';

describe('QRRefundList component', () => {
  it('QRRefundList: renders correctly', () => {
    const tree = renderer.create(<QRRefundList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
