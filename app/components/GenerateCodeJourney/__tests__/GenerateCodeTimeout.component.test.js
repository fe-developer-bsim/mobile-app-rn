import React from 'react';
import renderer from 'react-test-renderer';
import GenerateCodeTimeout from '../GenerateCodeTimeout.component';

describe('GenerateCodeTimeout component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <GenerateCodeTimeout/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
