import React from 'react';
import renderer from 'react-test-renderer';
import TapGenerateCode from '../TapGenerateCode.component';

describe('TapGenerateCode component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(
      <TapGenerateCode/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
