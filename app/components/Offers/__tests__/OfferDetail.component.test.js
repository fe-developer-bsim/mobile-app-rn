import React from 'react';
import renderer from 'react-test-renderer';

import OfferDetail from '../OfferDetail.component';

describe('OfferDetail component', () => {
  it('OfferDetail: renders correctly', () => {
    const tree = renderer.create(<OfferDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
