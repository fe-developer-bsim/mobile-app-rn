import React from 'react';
import renderer from 'react-test-renderer';

import UltraVoucherTnc from '../UltraVoucherTnc.component';

jest.mock('../UltraVoucherTnc.component');
describe('UltraVoucherTnc component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<UltraVoucherTnc name='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
