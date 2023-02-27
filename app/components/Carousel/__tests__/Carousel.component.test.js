import React from 'react';
import renderer from 'react-test-renderer';

import Carousel from '../Carousel.component';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Carousel />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
