import React from 'react';
import renderer from 'react-test-renderer';
import NavLeftEFormPGO from '../NavLeftEFormPGO.component';

describe('NavHeader Componenent: NavLeftEFormPGO', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavLeftEFormPGO/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
