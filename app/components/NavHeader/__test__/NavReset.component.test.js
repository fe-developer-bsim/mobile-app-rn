import React from 'react';
import renderer from 'react-test-renderer';
import NavReset from '../NavReset.component';

describe('NavHeader Componenent: NavReset', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavReset/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});