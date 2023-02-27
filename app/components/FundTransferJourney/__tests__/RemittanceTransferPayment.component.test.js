import React from 'react';
import renderer from 'react-test-renderer';

import RemittanceTransferPayment from '../RemittanceTransferPayment.component';

describe('RemittanceTransferPayment component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<RemittanceTransferPayment />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
