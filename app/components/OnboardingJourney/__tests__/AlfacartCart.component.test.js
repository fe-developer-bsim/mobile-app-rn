import React from 'react';
import renderer from 'react-test-renderer';
import AlfacartCart from '../AlfacartCart.component';

describe('AlfacartCart component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<AlfacartCart />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
