import React from 'react';
import renderer from 'react-test-renderer';
import MerchantList from '../MerchantList.component';

describe('MerchantList component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <MerchantList/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
