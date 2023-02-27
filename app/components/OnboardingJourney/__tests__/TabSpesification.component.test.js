import React from 'react';
import renderer from 'react-test-renderer';
import TabSpesification from '../TabSpesification.component';

describe('TabSpesification component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TabSpesification />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
