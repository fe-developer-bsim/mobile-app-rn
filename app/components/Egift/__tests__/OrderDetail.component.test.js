import React from 'react';
import renderer from 'react-test-renderer';

import OrderDetail from '../OrderDetail.component';

describe('OrderDetail component', () => {
  xit('OrderDetail: renders correctly', () => {
    const tree = renderer.create(<OrderDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
