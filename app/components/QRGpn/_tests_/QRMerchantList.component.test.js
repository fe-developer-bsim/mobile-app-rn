import React from 'react';
import renderer from 'react-test-renderer';

import QRMerchantList from '../QRMerchantList.component';

describe('QRMerchantList component', () => {
  xit('QRMerchantList: renders correctly', () => {
    const tree = renderer.create(<QRMerchantList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
