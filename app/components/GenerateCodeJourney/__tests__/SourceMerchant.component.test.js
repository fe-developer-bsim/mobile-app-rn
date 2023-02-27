import React from 'react';
import renderer from 'react-test-renderer';
import SourceMerchant from '../SourceMerchant.component';

describe('SourceMerchant component', () => {
  it('renders correctly', () => {
    const billerLKD = [];
    const tree = renderer.create(
      <SourceMerchant billerLKD={billerLKD}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
