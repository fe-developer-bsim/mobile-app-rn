import React from 'react';
import renderer from 'react-test-renderer';

import QRMenu from '../QRMenu.component';

describe('QRMenu component', () => {
  xit('QRMenu: renders correctly', () => {
    const tree = renderer.create(<QRMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
