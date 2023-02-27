import React from 'react';
import renderer from 'react-test-renderer';
import GenerateCodeTnc from '../GenerateCodeTnc.component';

describe('GenerateCodeTnc component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <GenerateCodeTnc/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
