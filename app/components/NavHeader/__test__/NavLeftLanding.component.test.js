import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftLanding from '../NavLeftLanding.component';

describe('NavHeader Componenent: NavLeftLanding', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftLanding/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
