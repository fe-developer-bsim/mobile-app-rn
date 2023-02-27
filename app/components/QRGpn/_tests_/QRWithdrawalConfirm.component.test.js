import React from 'react';
import renderer from 'react-test-renderer';

import QRWithdrawalConfirm from '../QRWithdrawalConfirm.component';

describe('QRWithdrawalConfirm component', () => {
  xit('QRWithdrawalConfirm: renders correctly', () => {
    const tree = renderer.create(<QRWithdrawalConfirm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
