import React from 'react';
import renderer from 'react-test-renderer';
import WishlistAlfacart from '../WishlistAlfacart.component';

describe('WishlistAlfacart component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<WishlistAlfacart />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
