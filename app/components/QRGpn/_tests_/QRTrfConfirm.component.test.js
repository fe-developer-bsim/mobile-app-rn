import React from 'react';
import renderer from 'react-test-renderer';

import QRTrfConfirm from '../QRTrfConfirm.component';

describe('QRTrfConfirm component', () => {
  xit('QRTrfConfirm: renders correctly', () => {
    const tree = renderer.create(<QRTrfConfirm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
