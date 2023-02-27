import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftClose from '../NavLeftClose.component';

describe('NavHeader Componenent: NavLeftClose', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftClose/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
