import React from 'react';
import renderer from 'react-test-renderer';

import QRStoreList from '../QRStoreList.component';

describe('QRStoreList component', () => {
  it('QRStoreList: renders correctly', () => {
    const tree = renderer.create(<QRStoreList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
