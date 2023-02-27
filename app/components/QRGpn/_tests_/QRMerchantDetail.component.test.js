import React from 'react';
import renderer from 'react-test-renderer';

import QRMerchantDetail from '../QRMerchantDetail.component';

describe('QRMerchantDetail component', () => {
  xit('QRMerchantDetail: renders correctly', () => {
    const tree = renderer.create(<QRMerchantDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
