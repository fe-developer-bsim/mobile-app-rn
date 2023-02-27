import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftBackRevamp from '../NavLeftBackRevamp.component';

describe('NavHeader Componenent: NavLeftBackRevamp', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftBackRevamp/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
