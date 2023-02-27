import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftInfo from '../NavLeftInfo.component';

describe('NavHeader Componenent: NavLeftInfo', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftInfo/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
