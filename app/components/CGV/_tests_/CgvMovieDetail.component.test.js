import React from 'react';
import renderer from 'react-test-renderer';

import CgvMovieDetail from '../CgvMovieDetail.component';

describe('CgvMovieDetail component', () => {
  it('CgvMovieDetail: renders correctly', () => {
    const tree = renderer.create(<CgvMovieDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
