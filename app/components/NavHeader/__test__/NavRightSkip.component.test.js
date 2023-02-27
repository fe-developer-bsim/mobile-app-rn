import React from 'react';
import renderer from 'react-test-renderer';
import NavRightSkip from '../NavRightSkip.component';

describe('NavHeader Componenent: NavRightSkip', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(
      <NavRightSkip navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});