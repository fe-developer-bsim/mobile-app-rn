import React from 'react';
import renderer from 'react-test-renderer';

import MerchantDeals from '../MerchantDeals.component';

describe('MerchantDeals component', () => {
  it('MerchantDeals: renders correctly', () => {
    const tree = renderer.create(<MerchantDeals />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
