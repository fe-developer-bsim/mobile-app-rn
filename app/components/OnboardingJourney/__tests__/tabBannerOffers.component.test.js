import React from 'react';
import renderer from 'react-test-renderer';
import tabBannerOffers from '../tabBannerOffers.component';

describe('tabBannerOffers component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<tabBannerOffers />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
