import React from 'react';
import renderer from 'react-test-renderer';

import QRRefundCode from '../QRRefundCode.component';

describe('QRRefundCode component', () => {
  xit('QRRefundCode: renders correctly', () => {
    const tree = renderer.create(<QRRefundCode />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
