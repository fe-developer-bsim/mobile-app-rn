import React from 'react';
import renderer from 'react-test-renderer';

import ProductDetail from '../ProductDetail.component';

jest.mock('../ProductDetail.component');

describe('ProductDetail component', () => {
  it('ProductDetail: renders correctly', () => {
    const tree = renderer.create(<ProductDetail/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
