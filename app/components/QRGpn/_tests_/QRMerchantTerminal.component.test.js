import React from 'react';
import renderer from 'react-test-renderer';

import QRMerchantTerminal from '../QRMerchantTerminal.component';

describe('QRMerchantTerminal component', () => {
  xit('QRMerchantTerminal: renders correctly', () => {
    const tree = renderer.create(<QRMerchantTerminal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
