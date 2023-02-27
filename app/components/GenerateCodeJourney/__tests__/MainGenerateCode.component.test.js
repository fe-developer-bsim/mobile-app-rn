import React from 'react';
import renderer from 'react-test-renderer';
import MainGenerateCode from '../MainGenerateCode.component';

describe('MainGenerateCode component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <MainGenerateCode/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
