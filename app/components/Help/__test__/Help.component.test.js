import React from 'react';
import renderer from 'react-test-renderer';
import Help from '../Help.component';

describe('Help component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Help/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
