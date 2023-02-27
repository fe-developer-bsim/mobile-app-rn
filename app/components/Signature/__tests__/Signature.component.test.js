import React from 'react';
import renderer from 'react-test-renderer';

import Signature from '../Signature.component';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Signature/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
