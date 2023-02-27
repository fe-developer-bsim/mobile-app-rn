import React from 'react';
import renderer from 'react-test-renderer';

import CgvOffer from '../CgvOffer.component';

describe('CgvOffer component', () => {
  xit('CgvOffer: renders correctly', () => {
    const tree = renderer.create(<CgvOffer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
