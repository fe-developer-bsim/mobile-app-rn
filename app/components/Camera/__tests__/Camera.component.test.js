import React from 'react';
import renderer from 'react-test-renderer';

import Camera from '../Camera.component';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Camera />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
