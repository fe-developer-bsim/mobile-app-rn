import React from 'react';
import renderer from 'react-test-renderer';

import QRWithdrawalMenu from '../QRWithdrawalMenu.component';

describe('QRWithdrawalMenu component', () => {
  it('QRWithdrawalMenu: renders correctly', () => {
    const tree = renderer.create(<QRWithdrawalMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
