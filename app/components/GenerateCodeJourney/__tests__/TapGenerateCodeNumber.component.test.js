import React from 'react';
import renderer from 'react-test-renderer';
import TapGenerateCodeNumber from '../TapGenerateCodeNumber.component';

describe('TapGenerateCodeNumber component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(
      <TapGenerateCodeNumber/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
