import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftCart from '../NavLeftCart.component';

describe('NavHeader Component: NavLeftCart', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftCart/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
