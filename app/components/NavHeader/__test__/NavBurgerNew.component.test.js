import React from 'react';
import renderer from 'react-test-renderer';
import NavBurgerNew from '../NavBurgerNew.component';

describe('NavBurgerNew Componenent: NavBurgerNew', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavBurgerNew/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
