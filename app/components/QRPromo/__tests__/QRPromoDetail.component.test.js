import React from 'react';
import renderer from 'react-test-renderer';

import QRPromoDetail from '../QRPromoDetail.component';

describe('QRPromoDetail component', () => {
  xit('QRPromoDetail: renders correctly', () => {
    const tree = renderer.create(<QRPromoDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
