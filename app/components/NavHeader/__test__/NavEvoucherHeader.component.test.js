import React from 'react';
import renderer from 'react-test-renderer';
import NavEvoucherHeader from '../NavEvoucherHeader.component';

describe('NavHeader Component: NavEvoucherHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavEvoucherHeader/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
