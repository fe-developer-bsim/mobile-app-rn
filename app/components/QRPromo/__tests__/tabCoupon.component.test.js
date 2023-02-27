import React from 'react';
import renderer from 'react-test-renderer';

import TabCoupon from '../tabCoupon.component';

describe('TabCoupon component', () => {
  it('TabCoupon: renders correctly', () => {
    const tree = renderer.create(<TabCoupon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
