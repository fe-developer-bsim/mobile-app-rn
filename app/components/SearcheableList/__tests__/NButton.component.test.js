import React from 'react';
import renderer from 'react-test-renderer';
import NButton from '../NButton.component';

describe('NButton component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
