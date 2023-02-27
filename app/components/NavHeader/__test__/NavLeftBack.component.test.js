import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftBack from '../NavLeftBack.component';

describe('NavHeader Componenent: NavLeftBack', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftBack/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
