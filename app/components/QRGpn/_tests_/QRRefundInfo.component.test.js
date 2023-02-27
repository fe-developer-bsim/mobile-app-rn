import React from 'react';
import renderer from 'react-test-renderer';

import QRRefundInfo from '../QRRefundInfo.component';

describe('QRRefundInfo component', () => {
  xit('QRRefundInfo: renders correctly', () => {
    const tree = renderer.create(<QRRefundInfo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
