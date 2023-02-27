import React from 'react';
import renderer from 'react-test-renderer';

import QRStoreItem from '../QRStoreItem.component';

describe('QRStoreItem component', () => {
  xit('QRStoreItem: renders correctly', () => {
    const tree = renderer.create(<QRStoreItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
