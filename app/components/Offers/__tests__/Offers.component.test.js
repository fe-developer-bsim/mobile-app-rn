import React from 'react';
import renderer from 'react-test-renderer';

import Offers from '../Offers.component';

describe('Offers component', () => {
  it('Offers: renders correctly', () => {
    const tree = renderer.create(<Offers />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
