import React from 'react';
import renderer from 'react-test-renderer';
import ScrollableViewOverlay from '../ScrollableViewOverlay.component';

describe('ScrollableViewOverlay component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ScrollableViewOverlay />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
