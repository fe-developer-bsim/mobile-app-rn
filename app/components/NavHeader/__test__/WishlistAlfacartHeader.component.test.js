import React from 'react';
import renderer from 'react-test-renderer';
import WishlistAlfacartheader from '../WishlistAlfacartheader.component';

describe('NavHeader Componenent: WishlistAlfacartheader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <WishlistAlfacartheader navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});