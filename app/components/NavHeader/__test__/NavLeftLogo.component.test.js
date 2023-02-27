import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftLogo from '../NavLeftLogo.component';

describe('NavHeader Componenent: NavLeftLogo', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftLogo/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
