import React from 'react';
import renderer from 'react-test-renderer';

import KTPCamera from '../KTPCamera.component';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<KTPCamera />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
