import React from 'react';
import renderer from 'react-test-renderer';
import Summary from '../Summary.component';

describe('Summary component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Summary />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
