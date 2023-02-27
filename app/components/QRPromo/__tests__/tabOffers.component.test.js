import React from 'react';
import renderer from 'react-test-renderer';

import TabOffers from '../tabOffers.component';

describe('TabOffers component', () => {
  it('TabOffers: renders correctly', () => {
    const tree = renderer.create(<TabOffers />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
