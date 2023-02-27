import React from 'react';
import renderer from 'react-test-renderer';
import StarRater from '../StarRater.component';

describe('StarRater component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<StarRater />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
