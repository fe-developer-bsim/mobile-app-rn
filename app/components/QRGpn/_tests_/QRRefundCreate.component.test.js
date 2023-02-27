import React from 'react';
import renderer from 'react-test-renderer';

import QRRefundCreate from '../QRRefundCreate.component';

describe('QRRefundCreate component', () => {
  xit('QRRefundCreate: renders correctly', () => {
    const tree = renderer.create(<QRRefundCreate />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
