import React from 'react';
import renderer from 'react-test-renderer';
import UltraVoucherPaymentStatus from '../UltraVoucherPaymentStatus.component';

describe('UltraVoucherPaymentStatus component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<UltraVoucherPaymentStatus/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
