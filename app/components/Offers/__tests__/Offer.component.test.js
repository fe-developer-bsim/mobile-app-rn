import React from 'react';
import renderer from 'react-test-renderer';

import Offer from '../Offer.component';

describe('Offer component', () => {
  xit('Offer: renders correctly', () => {
    const tree = renderer.create(<Offer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
