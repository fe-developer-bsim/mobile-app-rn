import React from 'react';
import renderer from 'react-test-renderer';

import KTPPassportCamera from '../KTPPassportCamera.component';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<KTPPassportCamera />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
