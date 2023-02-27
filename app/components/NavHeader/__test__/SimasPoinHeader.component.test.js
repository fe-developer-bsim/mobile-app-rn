import React from 'react';
import renderer from 'react-test-renderer';
import SimasPoinHeader from '../SimasPoinHeader.component';

describe('NavHeader Component: SimasPoinHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <SimasPoinHeader/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
