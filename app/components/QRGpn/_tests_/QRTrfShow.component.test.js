import React from 'react';
import renderer from 'react-test-renderer';

import QRTrfShow from '../QRTrfShow.component';

describe('QRTrfShow component', () => {
  xit('QRTrfShow: renders correctly', () => {
    const tree = renderer.create(<QRTrfShow />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
