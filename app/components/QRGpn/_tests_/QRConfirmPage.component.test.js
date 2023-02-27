import React from 'react';
import renderer from 'react-test-renderer';

import QRConfirmPage from '../QRConfirmPage.component';

describe('QRConfirmPage component', () => {
  xit('QRConfirmPage: renders correctly', () => {
    const tree = renderer.create(<QRConfirmPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
