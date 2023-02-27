import React from 'react';
import renderer from 'react-test-renderer';

import OpenNewAccountCamera from '../OpenNewAccountCamera.component';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<OpenNewAccountCamera />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
