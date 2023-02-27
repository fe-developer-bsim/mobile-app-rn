import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('react-timer-mixin');

import CarouselSwiper from '../CarouselSwiper.component';

describe('Carousel component', () => {
  const children = ['test'];
  it('renders correctly', () => {
    const tree = renderer.create(<CarouselSwiper children={children}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
