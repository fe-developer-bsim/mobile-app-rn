import React from 'react';
import renderer from 'react-test-renderer';

import EgiftPaymentStatus from '../EgiftPaymentStatus.component';

describe('EgiftPaymentStatus component', () => {
  xit('EgiftPaymentStatus: renders correctly', () => {
    const tree = renderer.create(<EgiftPaymentStatus/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
