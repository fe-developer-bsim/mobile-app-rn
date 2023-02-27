import React from 'react';
import renderer from 'react-test-renderer';

import QRWithdrawalForm from '../QRWithdrawalForm.component';

describe('QRWithdrawalForm component', () => {
  xit('QRWithdrawalForm: renders correctly', () => {
    const tree = renderer.create(<QRWithdrawalForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
