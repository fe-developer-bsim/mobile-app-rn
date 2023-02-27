import React from 'react';
import renderer from 'react-test-renderer';
import HeaderCgv from '../HeaderCgv.component';

describe('NavHeader Component: HeaderCgv', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <HeaderCgv/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
