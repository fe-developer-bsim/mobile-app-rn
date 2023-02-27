import React from 'react';
import renderer from 'react-test-renderer';

import QRChooseMenu from '../QRChooseMenu.component';

describe('QRChooseMenu component', () => {
  xit('QRChooseMenu: renders correctly', () => {
    const tree = renderer.create(<QRChooseMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
