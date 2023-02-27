import React from 'react';
import renderer from 'react-test-renderer';
import Landing from '../Landing.component';

describe('Landing component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Landing />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
