import React from 'react';
import renderer from 'react-test-renderer';

import QRInvoice from '../QRInvoice.component';

describe('QRInvoice component', () => {
  xit('QRInvoice: renders correctly', () => {
    const tree = renderer.create(<QRInvoice />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
