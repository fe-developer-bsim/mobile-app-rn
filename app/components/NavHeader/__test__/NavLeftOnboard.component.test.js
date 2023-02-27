import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftOnboard from '../NavLeftOnboard.component';

describe('NavHeader Componenent: NavLeftOnboard', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftOnboard/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
