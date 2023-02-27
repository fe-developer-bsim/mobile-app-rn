import React from 'react';
import renderer from 'react-test-renderer';

import TabMerchant from '../tabMerchant.component';

describe('TabMerchant component', () => {
  it('TabMerchant: renders correctly', () => {
    const tree = renderer.create(<TabMerchant />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
