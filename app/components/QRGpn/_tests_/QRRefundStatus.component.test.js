import React from 'react';
import renderer from 'react-test-renderer';

import QRRefundStatus from '../QRRefundStatus.component';

describe('QRRefundStatus component', () => {
  xit('QRRefundStatus: renders correctly', () => {
    const tree = renderer.create(<QRRefundStatus />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
